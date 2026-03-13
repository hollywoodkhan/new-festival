export interface Film {
  id: string;
  title: string;
  description: string;
  director: string;
  genre: string[];
  duration: number; // in minutes
  rating: string;
  imageUrl: string;
  trailerUrl?: string;
  screenings: Screening[];
}

export interface Screening {
  id: string;
  date: string; // ISO string
  venue: string;
  price: number;
}

export interface Ticket {
  id: string;
  filmId: string;
  screeningId: string;
  userId: string;
  purchaseDate: string;
  status: 'active' | 'used' | 'cancelled';
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'user' | 'admin';
}
