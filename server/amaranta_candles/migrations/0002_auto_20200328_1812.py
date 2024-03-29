# Generated by Django 3.0.4 on 2020-03-29 01:12

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("amaranta_candles", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="candle",
            old_name="batch_id",
            new_name="batch",
        ),
        migrations.RenameField(
            model_name="candle",
            old_name="dye_with_amount_ids",
            new_name="dyes_with_amounts",
        ),
        migrations.RenameField(
            model_name="candle",
            old_name="intended_scent_combo_id",
            new_name="intended_scent_combo",
        ),
        migrations.RenameField(
            model_name="candle",
            old_name="scent_with_amount_ids",
            new_name="scents_with_amounts",
        ),
        migrations.RenameField(
            model_name="candle",
            old_name="vessel_id",
            new_name="vessel",
        ),
        migrations.RenameField(
            model_name="candle",
            old_name="wax_with_amount_ids",
            new_name="waxes_with_amounts",
        ),
        migrations.RenameField(
            model_name="dyewithamount",
            old_name="dye_id",
            new_name="dye",
        ),
        migrations.RenameField(
            model_name="scentcombo",
            old_name="scent_ids",
            new_name="scents",
        ),
        migrations.RenameField(
            model_name="scentwithamount",
            old_name="scent_id",
            new_name="scent",
        ),
        migrations.RenameField(
            model_name="waxwithamount",
            old_name="wax_id",
            new_name="wax",
        ),
    ]
