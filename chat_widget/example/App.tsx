import React, { useState } from 'react';
import { ElevenLabsChat } from '../src/index';
import './App.css';

function App() {
  const [agentId, setAgentId] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agentId.trim()) {
      setError('Please enter an Agent ID');
      return;
    }
    setError(null);
    setShowChat(true);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>ElevenLabs React Chat</h1>
        <p>A simple chat interface powered by ElevenLabs Realtime API</p>
      </header>

      <main className="app-main">
        {!showChat ? (
          <div className="setup-container">
            <div className="setup-card">
              <h2>Get Started</h2>
              <p>
                To use this chat, you'll need an ElevenLabs Agent ID. Create one at{' '}
                <a href="https://elevenlabs.io/app" target="_blank" rel="noopener noreferrer">
                  elevenlabs.io
                </a>
              </p>

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Enter your Agent ID"
                  value={agentId}
                  onChange={(e) => setAgentId(e.target.value)}
                  className="agent-id-input"
                />
                {error && <p className="error">{error}</p>}
                <button type="submit" className="submit-btn">
                  Start Chat
                </button>
              </form>

              <div className="info-box">
                <h3>Features:</h3>
                <ul>
                  <li>Real-time voice conversation with ElevenLabs AI agents</li>
                  <li>Simple React component interface</li>
                  <li>Auto-scrolling message list</li>
                  <li>Connection status indicator</li>
                  <li>Built-in error handling</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="chat-container">
            <button
              className="back-btn"
              onClick={() => {
                setShowChat(false);
                setAgentId('');
              }}
            >
              ← Back
            </button>
            <div style={{ height: 'calc(100% - 40px)' }}>
              <ElevenLabsChat
                agentId={agentId}
                onError={(error) => {
                  console.error('Chat error:', error);
                }}
              />
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>
          Built with{' '}
          <a href="https://elevenlabs.io" target="_blank" rel="noopener noreferrer">
            ElevenLabs
          </a>
          {' '}&{' '}
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            React
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
