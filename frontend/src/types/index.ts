export interface CarConfig {
  model: string;
  paint: string;
  wheels: string;
  interior: string;
  autopilot: string;
  charging: string;
  insurance: string;
}

export interface ConfigOption {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
}

export interface PriceBreakdown {
  basePrice: number;
  paintPrice: number;
  wheelsPrice: number;
  interiorPrice: number;
  autopilotPrice: number;
  chargingPrice: number;
  insurancePrice: number;
  total: number;
}
