export type Theme = 'dark' | 'light';

export interface CoffeeSize {
  id: 'small' | 'medium' | 'large';
  label: string;
  volume: string;
  priceOffset: number;
}

export interface MilkOption {
  id: 'whole' | 'oat' | 'almond' | 'coconut';
  label: string;
  priceOffset: number;
}

export interface CoffeeItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  basePriceMAD: number; // e.g. 28 MAD
  rating: number;
  reviewCount: number;
  image: string;
  origin: string;
  roastLevel: 'Light' | 'Medium' | 'Dark';
  notes: string[];
  isSpecial?: boolean;
}

export interface CoffeeCustomization {
  size: CoffeeSize;
  milk: MilkOption;
  sweetness: number; // 0, 25, 50, 75, 100
  extraShots: number;
  notes?: string;
}

export interface CartItem {
  cartId: string;
  coffee: CoffeeItem;
  customization: CoffeeCustomization;
  quantity: number;
  unitPriceMAD: number;
  totalPriceMAD: number;
}

export interface LocationInfo {
  id: string;
  name: string;
  address: string;
  hours: string;
  distance: string;
  image: string;
}
