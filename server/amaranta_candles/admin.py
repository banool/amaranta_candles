from amaranta_candles import models
from django.contrib import admin
from django.core.exceptions import ValidationError
from django import forms
from django.db.models.base import ModelBase
from django.shortcuts import render


for model_name in dir(models):
    model = getattr(models, model_name)
    if model in models.IGNORE:
        continue
    if isinstance(model, ModelBase):
        if model.__name__ == "Scent":

            class ScentAdmin(admin.ModelAdmin):
                ordering = ("name",)

            admin.site.register(model, ScentAdmin)
        else:
            admin.site.register(model)


# Add a custom Candle form that makes it easier to input an entire Candle.
class EasyCandle(models.Candle):
    class Meta:
        proxy = True


@admin.register(EasyCandle)
class EasyCandleAdminForm(admin.ModelAdmin):
    def has_add_permission(*args, **kwargs):
        return True

    def has_change_permission(*args, **kwargs):
        return False

    def has_delete_permission(*args, **kwargs):
        return False

    def get_form(self, request, obj=None, **kwargs):
        return EasyCandleForm


class EasyCandleForm(forms.ModelForm):
    COMMA_SEPARATED_HELP_TEXT = (
        'Enter values as name:value,name:value, e.g. "{eg}".{more}'
    )

    class Meta:
        model = models.Candle
        # Note, do NOT exclude fields when you want to replace their form fields.
        # If you do that, they don't get persisted to the DB.
        # For some reason including intended_scent_combo / vessel here fucks it all up.
        exclude = ["waxes_with_amounts", "scents__with_amounts", "dyes_with_amounts"]

    waxes_with_amounts = forms.CharField(
        required=True,
        help_text=COMMA_SEPARATED_HELP_TEXT.format(
            eg="464:12.0,444:8.0.",
            more=" If the wax doesn't already exist in the DB, this will fail.",
        ),
    )

    scents_with_amounts = forms.CharField(
        required=True,
        help_text=COMMA_SEPARATED_HELP_TEXT.format(
            eg="Oakmoss and Amber:0.45,Rain Water:0.2",
            more=" If the scent doesn't already exist in the DB, this will fail.",
        ),
    )

    dyes_with_amounts = forms.CharField(
        required=False,
        help_text=COMMA_SEPARATED_HELP_TEXT.format(
            eg="yellow:0.03,Blue:0.34 (note that case doesn't matter for dye)",
            more=" If the dye doesn't already exist in the DB, this will fail.",
        ),
    )

    intended_scent_combo = forms.CharField(
        required=False,
        help_text=(
            "Required if no ScentCombo can be found with the given scents. "
            "If given, and a ScentCombo already exists with this name, we will confirm "
            "the scents here match with those scents, and throw an error if not."
        ),
    )

    vessel = forms.CharField(
        required=True,
        help_text="If the vessel doesn't already exist in the DB, it will be added for you",
    )

    def process_comma_separated(self, data, field):
        s = data.get(field)
        if s is None:
            return None
        try:
            cs = [e.split(":") for e in s.split(",")]
            [_ for k, v in cs]
            return cs
        except Exception as e:
            self.add_error(field, f"Failed to parse: {e}")
            return None

    def process_amounts(
        self, data, field, model, link_model, lookup=None, add_if_missing=False
    ):
        # Destructure the comma separated string.
        cs = self.process_comma_separated(data, field)
        if not cs:
            return

        # Convert name for model into an instance of the model.
        # If add_if_missing is True, add the model instead of raising an error.
        model_to_amount = []
        for name, amount in cs:
            m = self.query(
                name, field, model, lookup=lookup, add_if_missing=add_if_missing
            )
            if not m:
                return
            model_to_amount.append([m, amount])

        # Create link models.
        link_models = []
        for model, amount in model_to_amount:
            modelkey = model.__class__.__name__.lower()
            kwargs = {
                modelkey: model,
                "amount": amount,
            }
            lm = link_model(**kwargs)
            lm.save()
            link_models.append(lm)

        # Finally, set the list of link models.
        data[field] = link_models

    def query(self, name, field, model, lookup=None, add_if_missing=False):
        # Convert casual names into correct names based on the lookup.
        lookup = lookup or {}
        name = lookup.get(name.lower(), name)
        models = model.objects.filter(name=name)
        if len(models) == 0:
            if add_if_missing:
                m = model(name=name)
                m.save()
            else:
                e = ValidationError(
                    "%(name)s could not be found",
                    code="invalid",
                    params={"name": name},
                )
                self.add_error(field, e)
                return
        elif len(models) == 2:
            e = ValidationError(
                "%(name)s matched multiple %(modelname)ss: %(models)s",
                code="invalid",
                params={"name": name, "models": models},
            )
            self.add_error(field, e)
            return
        else:
            m = models[0]
        return m

    def process_scent_combo(self, data, save=False):
        name = data["intended_scent_combo"] or None
        scent_combos = models.ScentCombo.objects.all()
        existing_based_on_name = None
        existing_based_on_scents = None
        scents = [
            models.Scent.objects.get(id=swa.scent.id)
            for swa in data["scents_with_amounts"]
        ]
        for sc in scent_combos:
            if sc.name == name:
                existing_based_on_name = sc
            existing_scents = [s.name for s in sc.scents.all()]
            if existing_scents == [s.name for s in scents]:
                existing_based_on_scents = sc
        if (
            existing_based_on_name
            and existing_based_on_scents
            and existing_based_on_name != existing_based_on_scents
        ):
            e = ValidationError(
                "Found two different ScentCombos based on scents (%(existing_scents)s) and name (%(existing_name)s), please supply a different name for this ScentCombo",
                code="invalid",
                params={
                    "existing_scents": existing_based_on_scents,
                    "existing_name": existing_based_on_name,
                },
            )
            self.add_error("intended_scent_combo", e)
            return

        if existing_based_on_scents is None and name is None:
            e = ValidationError(
                "Could not find a ScentCombo with the given scents, please supply a name for this ScentCombo",
                code="invalid",
                params={"name": name},
            )
            self.add_error("intended_scent_combo", e)
            return

        try:
            name = name.name
        except Exception:
            pass
        if existing_based_on_scents and name and existing_based_on_scents.name != name:
            e = ValidationError(
                "A ScentCombo for these scents already exists and it is called %(existing_name)s, not %(wrong_name)s",
                code="invalid",
                params={
                    "existing_name": existing_based_on_scents.name,
                    "wrong_name": name,
                },
            )
            self.add_error("intended_scent_combo", e)
            return

        existing = existing_based_on_scents or existing_based_on_name
        if existing:
            print(f"Using existing scent combo {existing}")
            data["intended_scent_combo"] = existing
            return

        if save:
            print(f"Adding new scent combo")
            sc = models.ScentCombo(name=name)
            sc.save()
            for s in scents:
                print(f"Adding scent {s} ({s.id}) to new ScentCombo")
                sc.scents.add(s)
            sc.save()
            print(f"Saved {sc}")
            data["intended_scent_combo"] = sc

    def raise_if_errors(self):
        iscn = self.cleaned_data.get("intended_scent_combo")
        if not iscn:
            iscn = self.cleaned_data.get("name")
        self.cleaned_data["intended_scent_combo"] = models.ScentCombo(name=iscn)
        if self._errors:
            raise ValidationError("There were issues with the data")

    def clean(self):
        cd = super().clean()

        print(f"Before: {cd}")

        wax_lookup = {
            "464": "Golden Brands 464 Soy Wax",
            "444": "Golden Brands 464 Soy Wax",
            "4630": "IGI 4630 Harmony Blend Wax",
        }

        dye_lookup = {
            "blue": "Summer Breeze Liquid Dye",
            "yellow": "Ivory Liquid Dye",
            "black": "Black Liquid Dye",
        }

        self.process_amounts(
            cd,
            "waxes_with_amounts",
            models.Wax,
            models.WaxWithAmount,
            lookup=wax_lookup,
            add_if_missing=False,
        )

        self.process_amounts(
            cd,
            "scents_with_amounts",
            models.Scent,
            models.ScentWithAmount,
            add_if_missing=False,
        )

        if cd["dyes_with_amounts"]:
            self.process_amounts(
                cd,
                "dyes_with_amounts",
                models.Dye,
                models.DyeWithAmount,
                lookup=dye_lookup,
                add_if_missing=False,
            )
        else:
            cd["dyes_with_amounts"] = []

        self.raise_if_errors()

        # Add ScentCombo
        self.process_scent_combo(cd, save=True)

        cd["vessel"] = self.query(
            cd["vessel"], "vessel", models.Vessel, add_if_missing=True
        )

        if self._errors:
            raise ValidationError("There were issues with the data")

        print(f"After: {self.cleaned_data}")

        return cd

    def save(self, *args, **kwargs):
        return super().save(*args, **kwargs)
