import { useEffect, useState } from 'react';
import { Home } from 'lucide-react';
import type { Apartment } from '../types';

interface ApartmentsListProps {
  onBookTour: (apartmentId: number) => void;
}

export default function ApartmentsList({ onBookTour }: ApartmentsListProps) {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApartments();
  }, []);

  const fetchApartments = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:8000/tours/apartments/');
      if (!response.ok) {
        throw new Error('Failed to fetch apartments');
      }
      const data = await response.json();
      setApartments(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
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
        <p className="font-medium">Error loading apartments</p>
        <p className="text-sm mt-1">{error}</p>
        <button
          onClick={fetchApartments}
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
        <h2 className="text-2xl font-bold text-gray-900">Available Apartments</h2>
        <p className="text-gray-600 mt-1">Browse and schedule tours for our properties</p>
      </div>

      {apartments.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <Home className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-gray-600">No apartments available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apartments.map((apartment) => (
            <div
              key={apartment.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">{apartment.name}</h3>
                </div>
                <span className="text-xl font-bold text-blue-600">
                  ${apartment.price.toLocaleString()}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {apartment.description}
              </p>

              <button
                onClick={() => onBookTour(apartment.id)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Book a Tour
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
