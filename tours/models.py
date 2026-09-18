from django.db import models

class Apartment(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()

    def __str__(self):
        return self.name


class Tour(models.Model):
    name = models.CharField(max_length=100)
    date = models.DateField()
    apartments = models.ManyToManyField(Apartment)