# Generated by Django 4.2.2 on 2023-06-22 07:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("main", "0002_alter_userprofile_profile_image"),
    ]

    operations = [
        migrations.AlterField(
            model_name="history",
            name="chat_log",
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="history",
            name="report",
            field=models.JSONField(blank=True, null=True),
        ),
    ]
