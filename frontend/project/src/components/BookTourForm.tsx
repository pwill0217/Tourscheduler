import { useState, useEffect } from 'react';
import { Calendar, User, CheckCircle } from 'lucide-react';
import type { Apartment, CreateTourRequest } from '../types';

interface BookTourFormProps {
  preselectedApartmentId?: number;
  onSuccess: () => void;
}

export default function BookTourForm({ preselectedApartmentId, onSuccess }: BookTourFormProps) {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [formData, setFormData] = useState<CreateTourRequest>({
    apartment: preselectedApartmentId || 0,
    visitor_name: '',
    tour_date: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApartments();
  }, []);

  useEffect(() => {
    if (preselectedApartmentId) {
      setFormData((prev) => ({ ...prev, apartment: preselectedApartmentId }));
    }
  }, [preselectedApartmentId]);

  const fetchApartments = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/tours/apartments/');
      if (!response.ok) throw new Error('Failed to fetch apartments');
      const data = await response.json();
      setApartments(data);
    } catch (err) {
      console.error('Error fetching apartments:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('http://127.0.0.1:8000/tours/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to book tour');
      }

      setSuccess(true);
      setFormData({
        apartment: preselectedApartmentId || 0,
        visitor_name: '',
        tour_date: '',
      });

      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'apartment' ? Number(value) : value,
    }));
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Book a Tour</h2>
        <p className="text-gray-600 mt-1">Schedule your apartment viewing</p>
      </div>

      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-green-900">Tour booked successfully!</p>
            <p className="text-sm text-green-700 mt-1">
              Redirecting to tours list...
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="space-y-5">
          <div>
            <label htmlFor="apartment" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Calendar className="h-4 w-4" />
              Select Apartment
            </label>
            <select
              id="apartment"
              name="apartment"
              value={formData.apartment}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            >
              <option value={0}>Choose an apartment</option>
              {apartments.map((apartment) => (
                <option key={apartment.id} value={apartment.id}>
                  {apartment.name} - ${apartment.price.toLocaleString()}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="visitor_name" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <User className="h-4 w-4" />
              Your Name
            </label>
            <input
              type="text"
              id="visitor_name"
              name="visitor_name"
              value={formData.visitor_name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="tour_date" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Calendar className="h-4 w-4" />
              Tour Date
            </label>
            <input
              type="date"
              id="tour_date"
              name="tour_date"
              value={formData.tour_date}
              onChange={handleChange}
              min={today}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || success}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
        >
          {loading ? 'Booking...' : success ? 'Booked!' : 'Book Tour'}
        </button>
      </form>
    </div>
  );
}
