# Generated by Django 3.0.4 on 2020-03-28 19:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Base',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
                ('notes', models.CharField(blank=True, max_length=8192, null=True)),
                ('instance_created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Batch',
            fields=[
                ('base_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='amaranta_candles.Base')),
                ('made_at', models.DateTimeField()),
            ],
            bases=('amaranta_candles.base',),
        ),
        migrations.CreateModel(
            name='Dye',
            fields=[
                ('base_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='amaranta_candles.Base')),
            ],
            bases=('amaranta_candles.base',),
        ),
        migrations.CreateModel(
            name='Scent',
            fields=[
                ('base_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='amaranta_candles.Base')),
                ('url', models.CharField(blank=True, max_length=256, null=True)),
                ('photo_link', models.CharField(blank=True, max_length=256, null=True)),
            ],
            bases=('amaranta_candles.base',),
        ),
        migrations.CreateModel(
            name='Vessel',
            fields=[
                ('base_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='amaranta_candles.Base')),
            ],
            bases=('amaranta_candles.base',),
        ),
        migrations.CreateModel(
            name='Wax',
            fields=[
                ('base_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='amaranta_candles.Base')),
            ],
            bases=('amaranta_candles.base',),
        ),
        migrations.CreateModel(
            name='ScentCombo',
            fields=[
                ('base_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='amaranta_candles.Base')),
                ('scents', models.ManyToManyField(to='amaranta_candles.Scent')),
            ],
            bases=('amaranta_candles.base',),
        ),
    ]
