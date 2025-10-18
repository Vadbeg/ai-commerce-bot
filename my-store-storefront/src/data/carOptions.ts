export interface CarModel {
  id: string;
  name: string;
  price: number;
  description: string;
  range: string;
  topSpeed: string;
  acceleration: string;
}

export interface PaintColor {
  id: string;
  name: string;
  price: number;
}

export interface Wheel {
  id: string;
  name: string;
  price: number;
}

export interface Interior {
  id: string;
  name: string;
  price: number;
}

export interface AutopilotOption {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface ChargingOption {
  id: string;
  name: string;
  price: number;
}

export interface InsuranceOption {
  id: string;
  name: string;
  price: number;
}

export const models: CarModel[] = [
  {
    id: 'model-s',
    name: 'Edison Model S',
    price: 74990,
    description: 'Dual Motor All-Wheel Drive',
    range: '405 miles',
    topSpeed: '149 mph',
    acceleration: '3.1s 0-60 mph'
  },
  {
    id: 'model-s-plaid',
    name: 'Edison Model S Plaid',
    price: 89990,
    description: 'Tri Motor All-Wheel Drive',
    range: '396 miles',
    topSpeed: '200 mph',
    acceleration: '1.99s 0-60 mph'
  },
];

export const paintColors: PaintColor[] = [
  { id: 'pearl-white', name: 'Pearl White Multi-Coat', price: 0 },
  { id: 'solid-black', name: 'Solid Black', price: 0 },
  { id: 'midnight-silver', name: 'Midnight Silver Metallic', price: 1500 },
  { id: 'deep-blue', name: 'Deep Blue Metallic', price: 1500 },
  { id: 'red-multi-coat', name: 'Red Multi-Coat', price: 2500 },
];

export const wheels: Wheel[] = [
  { id: '19-tempest', name: '19" Tempest Wheels', price: 0 },
  { id: '21-arachnid', name: '21" Arachnid Wheels', price: 4500 },
];

export const interiors: Interior[] = [
  { id: 'all-black', name: 'All Black', price: 0 },
  { id: 'black-white', name: 'Black and White', price: 2000 },
  { id: 'cream', name: 'Cream', price: 2000 },
];

export const autopilotOptions: AutopilotOption[] = [
  {
    id: 'basic',
    name: 'Basic Autopilot',
    price: 0,
    description: 'Included'
  },
  {
    id: 'enhanced',
    name: 'Enhanced Autopilot',
    price: 6000,
    description: 'Navigate on Autopilot, Auto Lane Change, Autopark, Summon'
  },
  {
    id: 'fsd',
    name: 'Full Self-Driving Capability',
    price: 15000,
    description: 'All Enhanced Autopilot features plus Traffic Light and Stop Sign Control'
  },
];

export const chargingOptions: ChargingOption[] = [
  { id: 'mobile', name: 'Mobile Connector', price: 0 },
  { id: 'wall-connector', name: 'Wall Connector', price: 475 },
];

export const insuranceOptions: InsuranceOption[] = [
  { id: 'none', name: 'No Insurance', price: 0 },
  { id: 'basic', name: 'Basic Coverage', price: 1200 },
  { id: 'premium', name: 'Premium Coverage', price: 2400 },
];
