import uuid
from django.db import models

class UserDataModel(models.Model):
    user = models.CharField(max_length=30)

    def __str__(self):
        return f"""{self.user} """


class ScoreModel(models.Model):
    user = models.ForeignKey(UserDataModel, on_delete=models.CASCADE, related_name='rows')
    score = models.IntegerField(blank=True)
    time = models.IntegerField(blank=True)
    date = models.DateField(blank=True)

    def __str__(self):
        return f"""{self.user} {self.score} {self.time} {self.date}"""

class MultiplayerGameDataModel(models.Model):
    user = models.CharField(max_length=30)
    score = models.IntegerField(blank=True)
    time = models.IntegerField(blank=True)
    date = models.DateField(blank=True)

    def __str__(self):
        return f"""{self.user} {self.score} {self.time} {self.date}"""

class MachineGameDataModel(models.Model):
    user = models.CharField(max_length=30)
    score = models.IntegerField(blank=True)
    time = models.IntegerField(blank=True)
    date = models.DateField(blank=True)

    def __str__(self):
        return f"""{self.user} {self.score} {self.time} {self.date}"""


class Ciphertext(models.Model):
    text = models.CharField(max_length=255)