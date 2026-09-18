import { useEffect, useState } from 'react';
import { Calendar, User, Home } from 'lucide-react';
import type { Tour, Apartment } from '../types';

export default function ToursList() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [toursResponse, apartmentsResponse] = await Promise.all([
        fetch('http://127.0.0.1:8000/tours/'),
        fetch('http://127.0.0.1:8000/tours/apartments/'),
      ]);

      if (!toursResponse.ok || !apartmentsResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const toursData = await toursResponse.json();
      const apartmentsData = await apartmentsResponse.json();

      const apartmentsMap = apartmentsData.reduce(
        (acc: Record<number, string>, apt: Apartment) => {
          acc[apt.id] = apt.name;
          return acc;
        },
        {}
      );

      const toursWithNames = toursData.map((tour: Tour) => ({
        ...tour,
        apartment_name: apartmentsMap[tour.apartment] || 'Unknown',
      }));

      setTours(toursWithNames);
      setApartments(apartmentsData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        <p className="font-medium">Error loading tours</p>
        <p className="text-sm mt-1">{error}</p>
        <button
          onClick={fetchData}
          className="mt-3 text-sm font-medium text-red-600 hover:text-red-800"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Scheduled Tours</h2>
        <p className="text-gray-600 mt-1">View all upcoming apartment tours</p>
      </div>

      {tours.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <Calendar className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-gray-600">No tours scheduled yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">{tour.apartment_name}</h3>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="h-4 w-4" />
                  <span>{tour.visitor_name}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(tour.tour_date)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
