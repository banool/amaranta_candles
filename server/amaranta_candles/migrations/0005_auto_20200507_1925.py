# Generated by Django 3.0.4 on 2020-05-08 02:25

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("amaranta_candles", "0004_auto_20200507_1732"),
    ]

    operations = [
        migrations.AlterField(
            model_name="base",
            name="notes",
            field=models.TextField(blank=True, max_length=8192, null=True),
        ),
        migrations.AlterField(
            model_name="candle",
            name="notes",
            field=models.TextField(blank=True, max_length=8192, null=True),
        ),
    ]
