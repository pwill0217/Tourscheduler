# Tourscheduler
A full stack Apartment Tour Scheduling application built with Django REST Framework and a React + Vite frontend.
The application allows users to browse apartments, schedule tours, and view upcoming tour appointments.
Demo Screens
Available Apartments
Users can browse apartments and choose one to schedule a tour.
Book a Tour
Users can select an apartment, enter their name, and choose a date to schedule a tour.
Scheduled Tours
Users can view all upcoming tours.
Features
Browse available apartments
Schedule apartment tours
View upcoming tours
Django REST API backend
React frontend with modern UI
API driven architecture
Full CRUD backend structure
Tech Stack
Backend
Django
Django REST Framework
SQLite (default Django database)
Frontend
React
TypeScript
Vite
Tailwind CSS
Project Structure
tourscheduler
│
├── tour_scheduler/        # Django project configuration
├── tours/                 # Django app for tour + apartment models
│
├── frontend/
│   └── project/           # React frontend
│
└── manage.py
API Endpoints
Apartments
GET /tours/apartments/
Returns all apartments.
Example response:
[
  {
    "id": 1,
    "name": "Downtown Loft",
    "price": "1500.00",
    "description": "City apartment"
  }
]
Tours
GET /tours/
Returns all scheduled tours.
Create Tour
POST /tours/create/
Example request:
{
  "name": "Billy Bob",
  "date": "2026-03-10",
  "apartments": [1]
}
Running the Project Locally
1 Clone the repository
git clone https://github.com/YOUR_USERNAME/tour-scheduler.git
cd tour-scheduler
Backend Setup
Create virtual environment
python -m venv venv
source venv/bin/activate
Windows:
venv\Scripts\activate
Install dependencies
pip install django djangorestframework django-cors-headers
Run migrations
python manage.py migrate
Create admin user
python manage.py createsuperuser
Start Django server
python manage.py runserver
Backend will run at:
http://127.0.0.1:8000
Frontend Setup
Navigate to the frontend folder.
cd frontend/project
Install dependencies:
npm install
Start development server:
npm run dev
Frontend will run at:
http://localhost:5173
Environment Configuration
Frontend API requests should target the Django backend.
Example .env file:
VITE_API_URL=http://127.0.0.1:8000
