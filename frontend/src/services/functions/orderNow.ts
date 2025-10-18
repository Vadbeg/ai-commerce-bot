/**
 * Order Now Function - Navigates to the configurator/cart page
 *
 * ElevenLabs Configuration:
 * 1. In ElevenLabs UI, create a client tool with:
 *    - Tool name: orderNow
 *    - Description: "Navigate to the order/configuration page to start customizing and ordering a vehicle. Use this when the user wants to order, buy, configure, or customize a car."
 *    - Parameters: None (empty)
 *    - Type: Client Tool
 *    - Wait for response: Optional (enable if you want the agent to receive confirmation)
 */

import type { FunctionDefinition } from '../functionCalling';

export const orderNowFunction: FunctionDefinition = {
  name: 'orderNow',
  description: 'Navigate to the order/configuration page to start customizing and ordering a vehicle. Use this when the user wants to order, buy, configure, or customize a car.',
  parameters: {
    type: 'object',
    properties: {},
    required: [],
  },
  handler: async () => {
    console.log('[orderNow] Navigating to configurator page...');

    // Navigate to the cart/configurator page
    window.location.href = '/cart';

    // Return response for agent (if "Wait for response" is enabled in ElevenLabs UI)
    return 'Successfully navigating to the order configuration page';
  },
};
