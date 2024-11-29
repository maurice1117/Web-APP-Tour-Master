# Generated by Django 5.1.3 on 2024-11-29 09:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_rename_note_location'),
    ]

    operations = [
        migrations.RenameField(
            model_name='location',
            old_name='content',
            new_name='description',
        ),
        migrations.RenameField(
            model_name='location',
            old_name='title',
            new_name='place',
        ),
        migrations.AddField(
            model_name='location',
            name='photo1',
            field=models.URLField(blank=True, max_length=500, null=True),
        ),
        migrations.AddField(
            model_name='location',
            name='photo2',
            field=models.URLField(blank=True, max_length=500, null=True),
        ),
        migrations.AddField(
            model_name='location',
            name='photo3',
            field=models.URLField(blank=True, max_length=500, null=True),
        ),
    ]
