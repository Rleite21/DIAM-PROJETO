# Generated by Django 5.2 on 2025-05-18 22:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('beer_budies', '0006_remove_userinfo_username_userinfo_user_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='userbebida',
            name='cervejas',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='userbebida',
            name='evento',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='userbebida',
            name='local',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
