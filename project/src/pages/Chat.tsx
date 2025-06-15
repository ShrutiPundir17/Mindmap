import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { Send, Bot, User, Lightbulb, Heart, Smile } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  mood?: string;
}

export default function Chat() {
  const { state, addChatMessage } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your AI companion. I\'m here to listen and support you. How are you feeling today?',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Mood detection and appropriate responses
    if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('down')) {
      return "I hear that you're feeling sad, and I want you to know that these feelings are valid. It's okay to have difficult days. Sometimes talking about what's weighing on you can help. Would you like to share what's been on your mind lately?";
    }
    
    if (lowerMessage.includes('anxious') || lowerMessage.includes('worried') || lowerMessage.includes('stress')) {
      return "Anxiety can feel overwhelming, but you're not alone in this. Try taking a few deep breaths with me - in for 4 counts, hold for 4, out for 4. What's causing you the most stress right now? Sometimes breaking things down into smaller pieces can make them feel more manageable.";
    }
    
    if (lowerMessage.includes('happy') || lowerMessage.includes('good') || lowerMessage.includes('great')) {
      return "I'm so glad to hear you're feeling positive! It's wonderful when we can recognize and celebrate these good moments. What's been contributing to these happy feelings? Sharing joy can help us remember what brings us peace.";
    }
    
    if (lowerMessage.includes('tired') || lowerMessage.includes('exhausted') || lowerMessage.includes('sleep')) {
      return "Feeling tired can really affect our mood and perspective. Are you getting enough rest? Sometimes our minds are as tired as our bodies. Have you tried any relaxation techniques before bed? I can suggest some if you'd like.";
    }
    
    if (lowerMessage.includes('lonely') || lowerMessage.includes('alone') || lowerMessage.includes('isolated')) {
      return "Loneliness is one of the most difficult feelings to experience, but reaching out here shows your strength. You're taking a positive step by connecting. Remember, feeling lonely doesn't mean you're truly alone - there are people who care about you, even when it doesn't feel that way.";
    }
    
    // Default supportive responses
    const supportiveResponses = [
      "Thank you for sharing that with me. Your feelings and experiences matter. Tell me more about what's been on your mind.",
      "I appreciate you opening up. It takes courage to talk about how we're feeling. What would be most helpful for you right now?",
      "I'm here to listen without judgment. Sometimes just expressing our thoughts can bring clarity. How has your day been treating you?",
      "Your wellbeing is important. I'm glad you're taking time to check in with yourself. What's one thing that brought you even a small moment of peace today?",
      "Every feeling you have is valid, and I'm honored you're sharing with me. What support do you feel you need most right now?"
    ];
    
    return supportiveResponses[Math.floor(Math.random() * supportiveResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(inputMessage),
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      addChatMessage({ userMessage, aiResponse });
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickPrompts = [
    { text: "I'm feeling anxious", icon: Heart },
    { text: "I need motivation", icon: Lightbulb },
    { text: "I'm having a good day", icon: Smile },
  ];

  return (
    <div className="animate-fade-in" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{
        padding: 'var(--space-6)',
        borderBottom: '1px solid var(--neutral-200)',
        background: 'white',
        borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
        boxShadow: 'var(--shadow-sm)',
      }}>
        <h1 style={{ 
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          margin: 0,
          fontSize: 'var(--font-size-2xl)',
          color: 'var(--primary-600)',
        }}>
          <Bot size={32} />
          AI Companion Chat
        </h1>
        <p style={{ 
          margin: 'var(--space-2) 0 0 0',
          color: 'var(--neutral-600)',
        }}>
          Share your thoughts and feelings in a safe, judgment-free space
        </p>
      </div>

      {/* Quick Prompts */}
      <div style={{
        padding: 'var(--space-4) var(--space-6)',
        background: 'var(--neutral-50)',
        borderBottom: '1px solid var(--neutral-200)',
      }}>
        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          {quickPrompts.map((prompt, index) => {
            const Icon = prompt.icon;
            return (
              <button
                key={index}
                className="btn btn-sm btn-secondary"
                onClick={() => setInputMessage(prompt.text)}
                style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}
              >
                <Icon size={16} />
                {prompt.text}
              </button>
            );
          })}
        </div>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: 'var(--space-6)',
        background: 'linear-gradient(135deg, var(--primary-50) 0%, var(--secondary-50) 100%)',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {messages.map((message) => (
            <div
              key={message.id}
              style={{
                display: 'flex',
                justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: 'var(--space-4)',
                animation: 'slideIn 0.3s ease-out',
              }}
            >
              <div style={{
                maxWidth: '70%',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-3)',
                flexDirection: message.type === 'user' ? 'row-reverse' : 'row',
              }}>
                {/* Avatar */}
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: message.type === 'user' 
                    ? 'var(--gradient-primary)' 
                    : 'var(--gradient-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {message.type === 'user' ? (
                    <User size={20} color="white" />
                  ) : (
                    <Bot size={20} color="white" />
                  )}
                </div>

                {/* Message Bubble */}
                <div style={{
                  background: message.type === 'user' 
                    ? 'var(--primary-500)' 
                    : 'white',
                  color: message.type === 'user' ? 'white' : 'var(--neutral-800)',
                  padding: 'var(--space-4) var(--space-5)',
                  borderRadius: message.type === 'user'
                    ? 'var(--radius-xl) var(--radius-xl) var(--radius-md) var(--radius-xl)'
                    : 'var(--radius-xl) var(--radius-xl) var(--radius-xl) var(--radius-md)',
                  boxShadow: 'var(--shadow-md)',
                  border: message.type === 'user' ? 'none' : '1px solid var(--neutral-200)',
                }}>
                  <p style={{ 
                    margin: 0, 
                    lineHeight: 1.5,
                    whiteSpace: 'pre-wrap',
                  }}>
                    {message.content}
                  </p>
                  <div style={{
                    fontSize: 'var(--font-size-xs)',
                    opacity: 0.7,
                    marginTop: 'var(--space-2)',
                  }}>
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div style={{
              display: 'flex',
              justifyContent: 'flex-start',
              marginBottom: 'var(--space-4)',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-3)',
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--gradient-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Bot size={20} color="white" />
                </div>
                <div style={{
                  background: 'white',
                  padding: 'var(--space-4) var(--space-5)',
                  borderRadius: 'var(--radius-xl) var(--radius-xl) var(--radius-xl) var(--radius-md)',
                  boxShadow: 'var(--shadow-md)',
                  border: '1px solid var(--neutral-200)',
                }}>
                  <div style={{ display: 'flex', gap: 'var(--space-1)' }}>
                    {[0, 1, 2].map(i => (
                      <div
                        key={i}
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: 'var(--primary-400)',
                          animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div style={{
        padding: 'var(--space-6)',
        borderTop: '1px solid var(--neutral-200)',
        background: 'white',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ 
            display: 'flex', 
            gap: 'var(--space-3)',
            alignItems: 'flex-end',
          }}>
            <div style={{ flex: 1 }}>
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share what's on your mind..."
                className="input"
                style={{
                  minHeight: '60px',
                  maxHeight: '120px',
                  resize: 'vertical',
                  paddingTop: 'var(--space-4)',
                }}
                disabled={isTyping}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="btn btn-primary"
              style={{
                padding: 'var(--space-4)',
                height: '60px',
                opacity: (!inputMessage.trim() || isTyping) ? 0.5 : 1,
              }}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0%, 70%, 100% {
              transform: scale(1);
              opacity: 0.5;
            }
            35% {
              transform: scale(1.3);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
}