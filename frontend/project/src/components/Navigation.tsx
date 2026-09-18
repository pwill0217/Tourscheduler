import { Home, Calendar, List } from 'lucide-react';

interface NavigationProps {
  currentView: 'apartments' | 'book' | 'tours';
  onNavigate: (view: 'apartments' | 'book' | 'tours') => void;
}

export default function Navigation({ currentView, onNavigate }: NavigationProps) {
  const navItems = [
    { id: 'apartments' as const, label: 'Apartments', icon: Home },
    { id: 'book' as const, label: 'Book Tour', icon: Calendar },
    { id: 'tours' as const, label: 'My Tours', icon: List },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Home className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">Tour Scheduler</h1>
          </div>

          <div className="flex gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
