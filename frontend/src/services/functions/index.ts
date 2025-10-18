/**
 * Export all available functions for LLM integration
 */

export { orderNowFunction } from './orderNow';

// Import all functions here as you add more
import { orderNowFunction } from './orderNow';

export const availableFunctions = [
  orderNowFunction,
  // Add more functions here
];
