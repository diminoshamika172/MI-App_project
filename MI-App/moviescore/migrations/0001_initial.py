# Generated by Django 2.2.5 on 2019-11-02 11:24

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MovieScore',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('movieCd', models.CharField(max_length=8)),
                ('movieNm', models.CharField(max_length=128)),
                ('impression', models.PositiveSmallIntegerField()),
                ('fear', models.PositiveSmallIntegerField()),
                ('anger', models.PositiveSmallIntegerField()),
                ('sadness', models.PositiveSmallIntegerField()),
                ('fun', models.PositiveSmallIntegerField()),
                ('boredom', models.PositiveSmallIntegerField()),
            ],
        ),
    ]