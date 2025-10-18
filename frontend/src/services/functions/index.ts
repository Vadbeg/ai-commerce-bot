/**
 * Export all available functions for LLM integration
 */

export { orderNowFunction } from './orderNow';
export { requestHumanHelpFunction } from './requestHumanHelp';

// Import all functions here as you add more
import { orderNowFunction } from './orderNow';
import { requestHumanHelpFunction } from './requestHumanHelp';

export const availableFunctions = [
  orderNowFunction,
  requestHumanHelpFunction,
];
