import { CoffeeItem, CoffeeSize, MilkOption, LocationInfo } from '../types';

export const SIZES: CoffeeSize[] = [
  { id: 'small', label: 'Small', volume: '8 oz / 240 ml', priceOffset: 0 },
  { id: 'medium', label: 'Medium', volume: '12 oz / 355 ml', priceOffset: 5 },
  { id: 'large', label: 'Large', volume: '16 oz / 470 ml', priceOffset: 9 },
];

export const MILK_OPTIONS: MilkOption[] = [
  { id: 'whole', label: 'Whole Milk', priceOffset: 0 },
  { id: 'oat', label: 'Artisanal Oat Milk', priceOffset: 4 },
  { id: 'almond', label: 'Roasted Almond Milk', priceOffset: 4 },
  { id: 'coconut', label: 'Organic Coconut Milk', priceOffset: 4 },
];

export const COFFEE_MENU: CoffeeItem[] = [
  {
    id: 'caramel-latte',
    name: 'Caramel Latte',
    tagline: 'Signature Liquid Gold',
    description: 'Freshly pulled double espresso layered with silky micro-foam milk and drizzled with organic golden caramel sauce.',
    basePriceMAD: 28,
    rating: 4.9,
    reviewCount: 382,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600',
    origin: 'Ethiopian Yirgacheffe & Colombian Supremo',
    roastLevel: 'Medium',
    notes: ['Salted Caramel', 'Toasted Pecan', 'Silky Vanilla'],
    isSpecial: true,
  },
  {
    id: 'artisan-cappuccino',
    name: 'Velvet Cappuccino',
    tagline: 'Classic Italian Craft',
    description: 'Equal parts dense espresso, steamed whole milk, and thick velvety micro-foam dusted with raw Valrhona dark cocoa.',
    basePriceMAD: 26,
    rating: 4.8,
    reviewCount: 245,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=600',
    origin: 'Guatemalan Antigua',
    roastLevel: 'Medium',
    notes: ['Dark Chocolate', 'Hazelnut', 'Honey Sweetness'],
  },
  {
    id: 'iced-golden-mocha',
    name: 'Iced Golden Mocha',
    tagline: 'Chilled Decadence',
    description: 'Cold espresso shaken with single-origin dark chocolate cocoa, Madagascar vanilla bean, poured over clear ice rocks.',
    basePriceMAD: 32,
    rating: 4.95,
    reviewCount: 512,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=600',
    origin: 'Costa Rican Tarrazú',
    roastLevel: 'Dark',
    notes: ['Brown Sugar', 'Dark Cocoa', 'Black Cherry'],
  },
  {
    id: 'spanish-latte',
    name: 'Royal Spanish Latte',
    tagline: 'Sweet & Concentrated',
    description: 'A rich espresso base blended with sweetened condensed milk and steamed oat milk for an exceptionally velvety finish.',
    basePriceMAD: 30,
    rating: 4.9,
    reviewCount: 198,
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=600',
    origin: 'Brazil Sul de Minas',
    roastLevel: 'Medium',
    notes: ['Condensed Cream', 'Toasted Milk', 'Cinnamon Spice'],
  },
  {
    id: 'single-origin-espresso',
    name: 'Double Origin Shot',
    tagline: 'Pure & Uncompromised',
    description: 'Concentrated 1:2 extraction displaying floral jasmine notes, sparkling citrus acidity, and a lingering cocoa finish.',
    basePriceMAD: 20,
    rating: 4.85,
    reviewCount: 160,
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=600',
    origin: 'Gesha Village, Ethiopia',
    roastLevel: 'Light',
    notes: ['Jasmine Floral', 'Bergamot', 'Peach Nectar'],
  }
];

export const CAFES_LOCATIONS: LocationInfo[] = [
  {
    id: 'casablanca-flagship',
    name: 'Bean & Brew Flagship Sanctuary',
    address: 'Boulevard de la Corniche, Anfa, Casablanca',
    hours: '07:00 AM - 11:00 PM',
    distance: '0.8 km away',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'rabat-marina',
    name: 'Bean & Brew Waterfront Lounge',
    address: 'Marina Bouregreg, Rabat-Salé',
    hours: '08:00 AM - 10:30 PM',
    distance: '3.4 km away',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'marrakech-palais',
    name: 'Bean & Brew Hivernage Lounge',
    address: 'Avenue Mohammed VI, Hivernage, Marrakech',
    hours: '08:00 AM - 12:00 AM',
    distance: '5.2 km away',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=600',
  },
];
