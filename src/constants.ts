import { Film } from './types';

export const MOCK_FILMS: Film[] = [
  {
    id: '1',
    title: 'Echoes of Eternity',
    description: 'A visual masterpiece exploring the concept of time and memory across generations.',
    director: 'Elena Vance',
    genre: ['Sci-Fi', 'Drama'],
    duration: 124,
    rating: 'PG-13',
    imageUrl: 'https://picsum.photos/seed/echoes/800/1200',
    screenings: [
      { id: 's1', date: '2026-05-15T18:00:00Z', venue: 'Grand Theater', price: 15 },
      { id: 's2', date: '2026-05-16T20:30:00Z', venue: 'Cinema One', price: 12 },
    ]
  },
  {
    id: '2',
    title: 'The Silent Peak',
    description: 'A gripping thriller set in the remote Himalayas where silence is the only survivor.',
    director: 'Julian Thorne',
    genre: ['Thriller', 'Adventure'],
    duration: 110,
    rating: 'R',
    imageUrl: 'https://picsum.photos/seed/peak/800/1200',
    screenings: [
      { id: 's3', date: '2026-05-15T21:00:00Z', venue: 'Grand Theater', price: 18 },
    ]
  },
  {
    id: '3',
    title: 'Neon Dreams',
    description: 'A vibrant journey through the underground music scene of a futuristic Tokyo.',
    director: 'Kenji Sato',
    genre: ['Musical', 'Cyberpunk'],
    duration: 95,
    rating: 'PG-13',
    imageUrl: 'https://picsum.photos/seed/neon/800/1200',
    screenings: [
      { id: 's4', date: '2026-05-17T19:00:00Z', venue: 'Starlight Plaza', price: 15 },
    ]
  },
  {
    id: '4',
    title: 'Velvet Shadows',
    description: 'A noir detective story set in the rainy streets of 1940s Paris.',
    director: 'Sophie Dubois',
    genre: ['Noir', 'Mystery'],
    duration: 105,
    rating: 'PG-13',
    imageUrl: 'https://picsum.photos/seed/velvet/800/1200',
    screenings: [
      { id: 's5', date: '2026-05-18T22:00:00Z', venue: 'Grand Theater', price: 20 },
    ]
  }
];
