export interface Apartment {
  id: number;
  name: string;
  price: number;
  description: string;
}

export interface Tour {
  id: number;
  apartment: number;
  apartment_name?: string;
  visitor_name: string;
  tour_date: string;
}

export interface CreateTourRequest {
  apartment: number;
  visitor_name: string;
  tour_date: string;
}
