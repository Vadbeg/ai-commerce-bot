# ElevenLabs React Chat Component

A simple, production-ready React component for integrating ElevenLabs realtime AI conversations into your application.

## Features

- <� Real-time voice conversation with ElevenLabs AI agents
- � Pure React component with TypeScript support
- <� Beautiful built-in UI with customizable styling
- = Automatic message handling and conversation management
- =� Responsive design (mobile-friendly)
- =� Error handling with callbacks
- � Lightweight with minimal dependencies
- <� Status indicators (connected, connecting, disconnected)

## Installation

```bash
npm install @ai-commerce/elevenlabs-react-chat
# or
yarn add @ai-commerce/elevenlabs-react-chat
# or
pnpm add @ai-commerce/elevenlabs-react-chat
```

### Requirements

- React 18.0+
- @elevenlabs/react library

## Quick Start

1. Get your Agent ID from [ElevenLabs](https://elevenlabs.io/app)
2. Import and use the component:

```tsx
import { ElevenLabsChat } from '@ai-commerce/elevenlabs-react-chat';

export default function App() {
  return (
    <div style={{ height: '100vh' }}>
      <ElevenLabsChat agentId="your-agent-id-here" />
    </div>
  );
}
```

## Usage

### Basic Example

```tsx
import React from 'react';
import { ElevenLabsChat } from '@ai-commerce/elevenlabs-react-chat';

function MyChat() {
  return (
    <ElevenLabsChat
      agentId="your-agent-id"
      onError={(error) => console.error('Chat error:', error)}
    />
  );
}

export default MyChat;
```

### With Custom Styling

```tsx
<ElevenLabsChat
  agentId="your-agent-id"
  className="custom-chat"
  messageListClassName="custom-messages"
  inputClassName="custom-input"
  buttonClassName="custom-button"
/>
```

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `agentId` | `string` | Yes | Your ElevenLabs Agent ID |
| `onError` | `(error: Error) => void` | No | Callback function for error handling |
| `className` | `string` | No | Custom CSS class for main container |
| `messageListClassName` | `string` | No | Custom CSS class for message list |
| `inputClassName` | `string` | No | Custom CSS class for input field |
| `buttonClassName` | `string` | No | Custom CSS class for buttons |

## API Reference

### ElevenLabsChat Component

The `ElevenLabsChat` component handles all the complexity of connecting to ElevenLabs' realtime API and managing the conversation state.

#### Props

```typescript
interface ElevenLabsChatProps {
  agentId: string;
  onError?: (error: Error) => void;
  className?: string;
  messageListClassName?: string;
  inputClassName?: string;
  buttonClassName?: string;
}
```

#### Message Interface

```typescript
interface Message {
  type: 'user' | 'assistant';
  text: string;
  timestamp: number;
}
```

## Features in Detail

### Auto-Scrolling
Messages automatically scroll to the bottom as new ones arrive.

### Connection Management
- **Start/End Conversation**: Click "Start" or "End" button to manage connection
- **Status Indicator**: Real-time display of connection status
- **Speaking Indicator**: Shows when the assistant is speaking

### Error Handling
All errors are caught and passed to the `onError` callback. The UI gracefully handles failures without crashing.

### Built-in Styling
The component comes with professionally designed styles that work out-of-the-box. Customize by providing custom class names or override with CSS.

## Styling Guide

### CSS Classes

- `.elevenlabs-chat` - Main container
- `.elevenlabs-chat-header` - Header section
- `.elevenlabs-chat-title` - Title text
- `.elevenlabs-chat-status` - Status indicator
- `.elevenlabs-message-list` - Messages container
- `.elevenlabs-chat-message` - Individual message
- `.elevenlabs-chat-message-bubble` - Message content box
- `.elevenlabs-chat-form` - Input form
- `.elevenlabs-input` - Input field
- `.elevenlabs-button` - Action buttons

### Customization Example

```tsx
import { ElevenLabsChat } from '@ai-commerce/elevenlabs-react-chat';
import './custom-styles.css';

function MyChat() {
  return (
    <ElevenLabsChat
      agentId="your-agent-id"
      className="my-custom-chat"
      messageListClassName="my-custom-messages"
      inputClassName="my-custom-input"
      buttonClassName="my-custom-button"
    />
  );
}
```

```css
/* custom-styles.css */
.my-custom-chat {
  border-radius: 12px;
  max-width: 600px;
}

.my-custom-button {
  background-color: #667eea;
}

.my-custom-button:hover {
  background-color: #764ba2;
}
```

## Running the Example

The project includes a complete example application:

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Run the example (requires setting up Vite)
cd example
npm install
npm run dev
```

## Component Lifecycle

1. **Initial Load**: Component mounts and sets up event listeners
2. **User Starts Conversation**: WebSocket connection established to ElevenLabs
3. **Message Flow**:
   - User sends message
   - Component sends to agent via WebSocket
   - Agent responds with text/audio
   - Response displayed in message list
4. **Conversation Ends**: User clicks "End" or closes connection

## Best Practices

1. **Always provide an Agent ID**: The component requires a valid Agent ID to function
2. **Handle errors**: Implement the `onError` callback for production applications
3. **Container sizing**: Ensure the parent container has a defined height
4. **Responsive design**: Use CSS media queries to adapt on mobile devices
5. **Accessibility**: The component includes semantic HTML and ARIA attributes

## Troubleshooting

### Connection Issues
- Verify your Agent ID is correct
- Check that your ElevenLabs account is active
- Ensure your browser allows microphone access

### Messages Not Appearing
- Check browser console for errors
- Verify the agent responds to your messages
- Check network tab in DevTools for WebSocket connection

### Styling Issues
- Use more specific CSS selectors to override default styles
- Check for CSS conflicts with other libraries
- Use browser DevTools to inspect elements

## Contributing

We welcome contributions! Please feel free to submit issues or pull requests.

## License

MIT

## Support

For issues or questions:
- GitHub Issues: [ai-commerce-bot/issues](https://github.com/antonmasiukevich/ai-commerce-bot/issues)
- ElevenLabs Docs: [elevenlabs.io/docs](https://elevenlabs.io/docs)

## Resources

- [ElevenLabs Documentation](https://elevenlabs.io/docs)
- [React Documentation](https://react.dev)
- [@elevenlabs/react Package](https://www.npmjs.com/package/@elevenlabs/react)

---

Built with d using ElevenLabs and React
