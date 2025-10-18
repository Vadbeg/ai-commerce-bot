# Getting Started with ElevenLabs React Chat

## Prerequisites

- Node.js 16.0 or higher
- npm, yarn, or pnpm
- An ElevenLabs account with an Agent created

## Installation Steps

### 1. Install the Package

```bash
npm install @ai-commerce/elevenlabs-react-chat
```

### 2. Get Your Agent ID

1. Visit [ElevenLabs Dashboard](https://elevenlabs.io/app)
2. Create a new Agent or use an existing one
3. Copy your Agent ID from the dashboard

### 3. Basic Usage

Create a new React component:

```tsx
import React from 'react';
import { ElevenLabsChat } from '@ai-commerce/elevenlabs-react-chat';

export default function ChatPage() {
  return (
    <div style={{ height: '100vh' }}>
      <ElevenLabsChat
        agentId="your-agent-id-here"
        onError={(error) => console.error('Error:', error)}
      />
    </div>
  );
}
```

### 4. Add to Your App

```tsx
import ChatPage from './ChatPage';

function App() {
  return <ChatPage />;
}

export default App;
```

## Running the Example

To see a complete working example:

```bash
# Build the main package
npm run build

# Install example dependencies
cd example
npm install

# Run development server
npm run dev
```

The example will open at `http://localhost:3000`

## Configuration Options

### Basic Props

```tsx
<ElevenLabsChat
  agentId="your-agent-id"           // Required: Your ElevenLabs Agent ID
  onError={(error) => {}}            // Optional: Error handler
  className="my-chat"                // Optional: Custom CSS class
  messageListClassName="my-messages" // Optional: Custom messages CSS
  inputClassName="my-input"          // Optional: Custom input CSS
  buttonClassName="my-buttons"       // Optional: Custom button CSS
/>
```

## Styling

### Default Theme

The component comes with a professional default theme. To customize:

```tsx
<div style={{ padding: '20px' }}>
  <ElevenLabsChat
    agentId="your-agent-id"
    className="custom-chat"
  />
</div>
```

```css
.custom-chat {
  border-radius: 12px;
  max-width: 600px;
  height: 600px;
}

.custom-chat .elevenlabs-message-list {
  background-color: #f8f9fa;
}
```

## Troubleshooting

### Chat Won't Connect

1. **Check Agent ID**: Verify the Agent ID is correct
2. **Check Permissions**: Ensure your ElevenLabs account has permission to use the agent
3. **Microphone Access**: Browser may need microphone permission
4. **Network**: Check browser console for network errors

### Messages Not Sending

1. **Connection Status**: Click "Start" button to establish connection first
2. **Console Errors**: Check browser DevTools console for detailed errors
3. **Agent Response**: Verify your agent is properly configured in ElevenLabs

### Styling Issues

1. **CSS Specificity**: Use more specific selectors to override defaults
2. **CSS Conflicts**: Check for conflicting global CSS
3. **Browser Cache**: Clear browser cache if styles don't update

## Next Steps

1. Read the [README](./README.md) for complete documentation
2. Check [ElevenLabs Documentation](https://elevenlabs.io/docs) for agent setup
3. Explore the [example application](./example) for a full implementation
4. Review [API Reference](./README.md#api-reference) for all available options

## Common Issues & Solutions

### Issue: "Agent not found" error

**Solution**: Double-check your Agent ID in the ElevenLabs dashboard. Make sure you copied it correctly.

### Issue: Microphone access denied

**Solution**:
- Check browser permissions
- Reload the page and grant microphone access
- Try a different browser

### Issue: Component not rendering

**Solution**:
- Ensure parent container has a defined height
- Check console for errors
- Verify React version is 18.0+

### Issue: Messages appear but no response

**Solution**:
- Wait longer for agent to respond
- Check agent configuration in ElevenLabs
- Verify network connection in DevTools

## Support

For issues or questions:
- [GitHub Issues](https://github.com/antonmasiukevich/ai-commerce-bot/issues)
- [ElevenLabs Support](https://elevenlabs.io/support)
- [React Documentation](https://react.dev)

## Performance Tips

1. **Container Height**: Always set a specific height on the parent container
2. **Lazy Loading**: Load the component only when needed
3. **Error Handling**: Implement proper error handling for production
4. **Monitoring**: Add error tracking for better debugging

```tsx
<ElevenLabsChat
  agentId="your-agent-id"
  onError={(error) => {
    // Send to error tracking service
    console.error('Chat error:', error);
    // Example: Sentry.captureException(error);
  }}
/>
```

Happy chatting! 🚀
