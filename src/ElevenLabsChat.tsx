import React, { useState, useRef, useEffect } from 'react';
import { useConversation } from '@elevenlabs/react';

export interface Message {
  type: 'user' | 'ai';
  text: string;
  timestamp: number;
}

export interface ElevenLabsChatProps {
  agentId: string;
  onError?: (error: string) => void;
  className?: string;
  messageListClassName?: string;
  inputClassName?: string;
  buttonClassName?: string;
}

export const ElevenLabsChat: React.FC<ElevenLabsChatProps> = ({
  agentId,
  onError,
  className = 'elevenlabs-chat',
  messageListClassName = 'elevenlabs-message-list',
  inputClassName = 'elevenlabs-input',
  buttonClassName = 'elevenlabs-button',
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    status,
    isSpeaking,
    startSession,
    endSession,
    sendUserMessage,
  } = useConversation({
    agentId,
    onError: (errorMessage) => {
      console.error('ElevenLabs error:', errorMessage);
      onError?.(errorMessage);
    },
    onMessage: ({ message, source }) => {
      setMessages((prev) => [
        ...prev,
        {
          type: source,
          text: message,
          timestamp: Date.now(),
        },
      ]);
      if (source === 'ai') {
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleStartConversation = async () => {
    try {
      if (status === 'connected') {
        await endSession();
      } else {
        await startSession({ agentId, connectionType: 'websocket' });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('Failed to manage session:', errorMessage);
      onError?.(errorMessage);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    // Ensure conversation is started
    if (status !== 'connected') {
      try {
        await startSession({ agentId, connectionType: 'websocket' });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error('Failed to start session:', errorMessage);
        onError?.(errorMessage);
        return;
      }
    }

    setIsLoading(true);
    const messageText = inputValue;
    setInputValue('');

    try {
      // Send message to the agent
      sendUserMessage(messageText);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('Failed to send message:', errorMessage);
      onError?.(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <div className={className}>
      <style>{`
        .${className} {
          display: flex;
          flex-direction: column;
          height: 100%;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .${className}-header {
          padding: 16px;
          border-bottom: 1px solid #e5e7eb;
          background: #f9fafb;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .${className}-title {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
        }

        .${className}-status {
          font-size: 12px;
          color: #6b7280;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .${className}-status.connected {
          color: #10b981;
        }

        .${className}-status.connecting {
          color: #f59e0b;
        }

        .${className}-status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
        }

        .${messageListClassName} {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .${className}-message {
          display: flex;
          gap: 8px;
        }

        .${className}-message.user {
          justify-content: flex-end;
        }

        .${className}-message-bubble {
          max-width: 70%;
          padding: 12px 16px;
          border-radius: 12px;
          word-wrap: break-word;
          font-size: 14px;
          line-height: 1.4;
        }

        .${className}-message.ai .${className}-message-bubble {
          background: #e5e7eb;
          color: #111827;
          border-radius: 12px 12px 12px 4px;
        }

        .${className}-message.user .${className}-message-bubble {
          background: #3b82f6;
          color: white;
          border-radius: 12px 12px 4px 12px;
        }

        .${className}-message-time {
          font-size: 12px;
          color: #9ca3af;
          display: flex;
          align-items: flex-end;
        }

        .${className}-form {
          padding: 12px 16px;
          border-top: 1px solid #e5e7eb;
          display: flex;
          gap: 8px;
          background: #f9fafb;
        }

        .${inputClassName} {
          flex: 1;
          padding: 10px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s;
        }

        .${inputClassName}:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .${inputClassName}:disabled {
          background: #f3f4f6;
          color: #9ca3af;
        }

        .${buttonClassName} {
          padding: 10px 16px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
          white-space: nowrap;
        }

        .${buttonClassName}:hover {
          background: #2563eb;
        }

        .${buttonClassName}:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }

        .${buttonClassName}.connect-btn {
          background: #10b981;
          min-width: 100px;
        }

        .${buttonClassName}.connect-btn:hover {
          background: #059669;
        }

        .${buttonClassName}.connect-btn:disabled {
          background: #6b7280;
        }
      `}</style>

      <div className={`${className}-header`}>
        <div className={`${className}-title`}>
          ElevenLabs Chat
        </div>
        <div className={`${className}-status ${status}`}>
          <span
            className={`${className}-status-dot`}
            style={{
              backgroundColor:
                status === 'connected'
                  ? '#10b981'
                  : status === 'connecting'
                    ? '#f59e0b'
                    : '#d1d5db',
            }}
          />
          {status === 'connected' ? 'Connected' : status === 'connecting' ? 'Connecting...' : 'Disconnected'}
          {isSpeaking && ' (Speaking)'}
        </div>
      </div>

      <div className={messageListClassName}>
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', color: '#9ca3af', marginTop: '20px' }}>
            <p>No messages yet. Click "Start Conversation" to begin!</p>
          </div>
        )}

        {messages.map((message, index) => (
          <div key={index} className={`${className}-message ${message.type}`}>
            <div className={`${className}-message-bubble`}>{message.text}</div>
            <div className={`${className}-message-time`}>
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className={`${className}-form`}>
        <button
          type="button"
          onClick={handleStartConversation}
          className={`${buttonClassName} connect-btn`}
          disabled={status === 'connecting'}
        >
          {status === 'connected' ? 'End' : 'Start'}
        </button>
        <input
          type="text"
          className={inputClassName}
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={status !== 'connected' || isLoading}
        />
        <button
          type="submit"
          className={buttonClassName}
          disabled={!inputValue.trim() || isLoading || status !== 'connected'}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};
