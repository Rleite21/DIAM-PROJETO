# Generated by Django 5.2.1 on 2025-05-18 00:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('beer_budies', '0002_grupo_num_membros'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='evento',
            name='universidade',
        ),
        migrations.RemoveField(
            model_name='evento',
            name='preco_S',
        ),
        migrations.AddField(
            model_name='evento',
            name='uni',
            field=models.CharField(default='', max_length=20),
        ),
        migrations.AlterField(
            model_name='evento',
            name='hora',
            field=models.TimeField(),
        ),
        migrations.DeleteModel(
            name='Universidade',
        ),
    ]
