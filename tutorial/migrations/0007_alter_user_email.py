# Generated by Django 5.0.3 on 2024-03-26 08:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tutorial', '0006_post_date_time_alter_comment_date_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(max_length=254, unique=True),
        ),
    ]
