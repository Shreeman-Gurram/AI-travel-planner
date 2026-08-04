export const destinations = [
  {
    id: 1,
    name: 'Santorini',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=900&q=80',
    blurb: 'Sunset views, blue domes, and cliffside dining.',
    rating: 4.9,
    price: '$$'
  },
  {
    id: 2,
    name: 'Kyoto',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80',
    blurb: 'Temple gardens, cherry blossom seasons, and quiet cafés.',
    rating: 4.8,
    price: '$$$'
  },
  {
    id: 3,
    name: 'Marrakech',
    country: 'Morocco',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80',
    blurb: 'Vibrant markets, riads, and desert escapes.',
    rating: 4.7,
    price: '$$'
  }
]

export const hotels = [
  {
    id: 1,
    name: 'Aurelia Suites',
    location: 'Santorini',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    price: '$280/night',
    badge: 'Top Rated'
  },
  {
    id: 2,
    name: 'Mori House',
    location: 'Kyoto',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    price: '$220/night',
    badge: 'Garden View'
  }
]

export const restaurants = [
  {
    id: 1,
    name: 'Ocean Terrace',
    cuisine: 'Mediterranean',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    price: '$$'
  },
  {
    id: 2,
    name: 'Kumo Bistro',
    cuisine: 'Japanese',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    price: '$$$'
  }
]

export const mockTrips = [
  {
    id: 'trip-1',
    title: 'Aegean Summer Escape',
    destination: 'Santorini',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1000&q=80',
    startDate: '2026-08-18',
    endDate: '2026-08-24',
    budget: 3200,
    travelers: 2,
    type: 'Romantic',
    favorite: true,
    summary: 'Sunset views, boutique stays, and curated island hopping.'
  },
  {
    id: 'trip-2',
    title: 'Kyoto Culture Sprint',
    destination: 'Kyoto',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80',
    startDate: '2026-09-05',
    endDate: '2026-09-11',
    budget: 2600,
    travelers: 3,
    type: 'Cultural',
    favorite: false,
    summary: 'Temple visits, seasonal gardens, and a calm local pace.'
  }
]

export const weatherSnapshots = [
  { city: 'Santorini', temp: 29, condition: 'Sunny', icon: '☀️' },
  { city: 'Kyoto', temp: 24, condition: 'Clear', icon: '🌤️' },
  { city: 'Marrakech', temp: 34, condition: 'Warm', icon: '🌞' }
]

export const budgetBreakdown = [
  { name: 'Stay', value: 45 },
  { name: 'Food', value: 22 },
  { name: 'Transit', value: 18 },
  { name: 'Activities', value: 15 }
]

export const itineraryTemplates = [
  { day: 1, title: 'Arrival and waterfront dinner' },
  { day: 2, title: 'Historic district and local market walk' },
  { day: 3, title: 'Scenic coastal cruise' },
  { day: 4, title: 'Leisure day and spa reset' }
]

export const travelTips = [
  'Book flexible flights to catch better hotel availability.',
  'Carry a small power bank for long travel days.',
  'Keep a digital copy of your passport and insurance details.',
  'Use local transit cards when available to save on daily rides.'
]

export const recommendations = [
  'Private sunset cruise',
  'Boutique wellness retreat',
  'Weekend markets and artisan workshops'
]

export const faqItems = [
  { question: 'How does the planner generate trips?', answer: 'It blends your preferences with curated destinations and budget-aware suggestions.' },
  { question: 'Can I save multiple itineraries?', answer: 'Yes, your saved trips are stored locally in your personalized dashboard.' },
  { question: 'Is this experience fully visual?', answer: 'The UI includes maps, weather, budgets, and rich cards for every trip.' }
]

export const stats = [
  { label: 'Trips Planned', value: '128' },
  { label: 'Countries Visited', value: '19' },
  { label: 'Saved Itineraries', value: '42' }
]

export const recentSearches = ['Santorini villas', 'Budget Japan escape', 'Beach weekends in Europe']

export const emergencyContacts = [
  { name: 'Local Emergency', number: '112' },
  { name: 'Travel Assistance', number: '+1-800-555-0148' }
]

export const packingSuggestions = ['Light layers', 'Waterproof jacket', 'Sunscreen', 'Universal adapter']
