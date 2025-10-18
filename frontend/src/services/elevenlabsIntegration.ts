/**
 * ElevenLabs ConvAI Widget Integration
 *
 * This module integrates our function calling system with ElevenLabs ConvAI widget.
 * The widget fires events when the agent wants to call client tools.
 */

import { executeFunction, getFunctionDefinitions } from './functionCalling';

/**
 * Initialize ElevenLabs widget event listeners
 */
export function initializeElevenLabsIntegration() {
  // Wait for the widget element to be available
  const waitForWidget = setInterval(() => {
    const widget = document.querySelector('elevenlabs-convai');

    if (widget) {
      clearInterval(waitForWidget);
      setupWidgetListeners(widget);
    }
  }, 100);

  // Clear interval after 10 seconds if widget not found
  setTimeout(() => clearInterval(waitForWidget), 10000);
}

/**
 * Setup event listeners on the widget
 */
function setupWidgetListeners(widget: Element) {
  console.log('[ElevenLabs] Widget found, setting up client tool listeners');

  // Get all registered functions
  const functions = getFunctionDefinitions();

  // Add event listener for each registered function
  functions.forEach(func => {
    widget.addEventListener(func.name, async (event: any) => {
      console.log(`[ElevenLabs] Client tool called: ${func.name}`, event.detail);

      try {
        // Execute the function with parameters from the event
        const result = await executeFunction({
          name: func.name,
          parameters: event.detail || {}
        });

        // If the function returns a result, send it back to the agent
        if (result !== undefined && result !== null) {
          // The widget expects the result to be returned via event.respondWith()
          if (typeof (event as any).respondWith === 'function') {
            (event as any).respondWith(result);
          }
        }
      } catch (error) {
        console.error(`[ElevenLabs] Error executing ${func.name}:`, error);

        // Send error back to agent if possible
        if (typeof (event as any).respondWith === 'function') {
          (event as any).respondWith({
            error: true,
            message: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      }
    });

    console.log(`[ElevenLabs] Registered listener for: ${func.name}`);
  });

  console.log(`[ElevenLabs] Setup complete. ${functions.length} client tools registered.`);
}

/**
 * Get client tools configuration for ElevenLabs
 * This returns the format needed for ElevenLabs UI configuration
 */
export function getElevenLabsToolsConfig() {
  return getFunctionDefinitions().map(func => ({
    name: func.name,
    description: func.description,
    parameters: func.parameters,
    type: 'client',
  }));
}
