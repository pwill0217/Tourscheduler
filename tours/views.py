from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Tour
from .serializer import TourSerializer
from .models import Apartment
from .serializer import ApartmentSerializer


@api_view(['GET'])
def tour_list(request):
    tours = Tour.objects.all()
    serializer = TourSerializer(tours, many=True)
    return Response(serializer.data)
@api_view(['POST'])
def tour_create(request):
    serializer = TourSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)
@api_view(['GET', 'POST'])
def apartment_list(request):
    if request.method == 'GET':
        apartments = Apartment.objects.all()
        serializer = ApartmentSerializer(apartments, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ApartmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)