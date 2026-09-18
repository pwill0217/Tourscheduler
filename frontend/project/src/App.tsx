import { useState } from 'react';
import Navigation from './components/Navigation';
import ApartmentsList from './components/ApartmentsList';
import BookTourForm from './components/BookTourForm';
import ToursList from './components/ToursList';

type View = 'apartments' | 'book' | 'tours';

function App() {
  const [currentView, setCurrentView] = useState<View>('apartments');
  const [selectedApartmentId, setSelectedApartmentId] = useState<number | undefined>();

  const handleBookTour = (apartmentId: number) => {
    setSelectedApartmentId(apartmentId);
    setCurrentView('book');
  };

  const handleBookingSuccess = () => {
    setSelectedApartmentId(undefined);
    setCurrentView('tours');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentView={currentView} onNavigate={setCurrentView} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'apartments' && (
          <ApartmentsList onBookTour={handleBookTour} />
        )}

        {currentView === 'book' && (
          <BookTourForm
            preselectedApartmentId={selectedApartmentId}
            onSuccess={handleBookingSuccess}
          />
        )}

        {currentView === 'tours' && <ToursList />}
      </main>
    </div>
  );
}

export default App;
