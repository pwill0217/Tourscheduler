from rest_framework import serializers
from .models import Tour, Apartment


class ApartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Apartment
        fields = ['id', 'name', 'price', 'description']


class TourSerializer(serializers.ModelSerializer):
    apartments = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Apartment.objects.all()
    )

    class Meta:
        model = Tour
        fields = ['id', 'name', 'date', 'apartments']