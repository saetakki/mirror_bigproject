# Generated by Django 4.2.1 on 2023-06-22 05:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='profile_image',
            field=models.ImageField(default='images/Default-Profile-Image.png', upload_to='images'),
        ),
    ]
