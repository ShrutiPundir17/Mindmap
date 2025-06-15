import React, { useState } from 'react';
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Shield, 
  Clock,
  UserPlus,
  Send,
  Lock,
  Globe
} from 'lucide-react';

interface Room {
  id: string;
  name: string;
  description: string;
  category: string;
  members: number;
  isActive: boolean;
  isPrivate: boolean;
  lastActivity: string;
}

interface Message {
  id: string;
  user: string;
  message: string;
  timestamp: Date;
  isAnonymous: boolean;
}

const supportRooms: Room[] = [
  {
    id: '1',
    name: 'Anxiety Support Circle',
    description: 'A safe space to share experiences with anxiety and coping strategies',
    category: 'Anxiety',
    members: 24,
    isActive: true,
    isPrivate: false,
    lastActivity: '2 min ago',
  },
  {
    id: '2',
    name: 'Depression Warriors',
    description: 'Supporting each other through depression with understanding and hope',
    category: 'Depression',
    members: 18,
    isActive: true,
    isPrivate: false,
    lastActivity: '5 min ago',
  },
  {
    id: '3',
    name: 'Mindfulness Together',
    description: 'Practice mindfulness and meditation in a supportive community',
    category: 'Mindfulness',
    members: 31,
    isActive: false,
    isPrivate: false,
    lastActivity: '1 hour ago',
  },
  {
    id: '4',
    name: 'Student Stress Relief',
    description: 'Students supporting students through academic pressure and stress',
    category: 'Academic',
    members: 42,
    isActive: true,
    isPrivate: false,
    lastActivity: 'Just now',
  },
  {
    id: '5',
    name: 'Work-Life Balance',
    description: 'Professionals sharing tips for managing work stress and burnout',
    category: 'Professional',
    members: 15,
    isActive: false,
    isPrivate: true,
    lastActivity: '30 min ago',
  },
  {
    id: '6',
    name: 'Recovery Support',
    description: 'Private group for addiction recovery support and accountability',
    category: 'Recovery',
    members: 8,
    isActive: true,
    isPrivate: true,
    lastActivity: '10 min ago',
  },
];

const sampleMessages: Message[] = [
  {
    id: '1',
    user: 'Anonymous Butterfly',
    message: 'Thank you all for the support yesterday. Today feels a bit brighter.',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    isAnonymous: true,
  },
  {
    id: '2',
    user: 'Hopeful Owl',
    message: 'Has anyone tried the breathing technique we discussed? It really helped me during my presentation today.',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    isAnonymous: true,
  },
  {
    id: '3',
    user: 'Caring Fox',
    message: 'Remember, it\'s okay to have bad days. What matters is that we\'re here for each other. 💙',
    timestamp: new Date(Date.now() - 25 * 60 * 1000),
    isAnonymous: true,
  },
];

export default function SupportRooms() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [newMessage, setNewMessage] = useState('');
  const [filter, setFilter] = useState('all');

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedRoom) return;

    const message: Message = {
      id: Date.now().toString(),
      user: 'Anonymous Dolphin', // User's anonymous name
      message: newMessage,
      timestamp: new Date(),
      isAnonymous: true,
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const filteredRooms = supportRooms.filter(room => {
    if (filter === 'all') return true;
    if (filter === 'active') return room.isActive;
    if (filter === 'private') return room.isPrivate;
    return room.category.toLowerCase() === filter.toLowerCase();
  });

  const categories = ['all', 'active', 'private', 'anxiety', 'depression', 'mindfulness', 'academic', 'professional', 'recovery'];

  return (
    <div className="animate-fade-in" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{
        padding: 'var(--space-6)',
        borderBottom: '1px solid var(--neutral-200)',
        background: 'white',
        boxShadow: 'var(--shadow-sm)',
      }}>
        <h1 style={{ 
          fontSize: 'var(--font-size-4xl)',
          fontWeight: '700',
          marginBottom: 'var(--space-2)',
          background: 'var(--gradient-primary)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          Support Rooms
        </h1>
        <p style={{ 
          fontSize: 'var(--font-size-lg)',
          color: 'var(--neutral-600)',
          margin: 0,
        }}>
          Connect with others in safe, anonymous support communities
        </p>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar - Room List */}
        <div style={{
          width: '400px',
          borderRight: '1px solid var(--neutral-200)',
          background: 'var(--neutral-50)',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Safety Notice */}
          <div style={{
            padding: 'var(--space-4)',
            background: 'var(--primary-50)',
            border: '1px solid var(--primary-200)',
            margin: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <Shield size={16} color="var(--primary-600)" />
              <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: '600', color: 'var(--primary-700)' }}>
                Safe Space Guidelines
              </span>
            </div>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--primary-600)', margin: 0 }}>
              All conversations are anonymous. Be respectful, supportive, and mindful of others' experiences.
            </p>
          </div>

          {/* Filters */}
          <div style={{ padding: '0 var(--space-4) var(--space-4) var(--space-4)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className="btn btn-sm"
                  style={{
                    background: filter === category ? 'var(--primary-500)' : 'white',
                    color: filter === category ? 'white' : 'var(--neutral-600)',
                    border: '1px solid var(--neutral-300)',
                    textTransform: 'capitalize',
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Rooms List */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '0 var(--space-4)' }}>
            {filteredRooms.map((room) => (
              <div
                key={room.id}
                onClick={() => setSelectedRoom(room)}
                style={{
                  padding: 'var(--space-4)',
                  marginBottom: 'var(--space-3)',
                  background: selectedRoom?.id === room.id ? 'var(--primary-50)' : 'white',
                  borderRadius: 'var(--radius-lg)',
                  border: selectedRoom?.id === room.id 
                    ? '1px solid var(--primary-200)' 
                    : '1px solid var(--neutral-200)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: room.isActive ? 'var(--success-500)' : 'var(--neutral-400)',
                  }} />
                  <h4 style={{
                    fontSize: 'var(--font-size-base)',
                    fontWeight: '600',
                    margin: 0,
                    flex: 1,
                  }}>
                    {room.name}
                  </h4>
                  {room.isPrivate ? (
                    <Lock size={16} color="var(--neutral-500)" />
                  ) : (
                    <Globe size={16} color="var(--neutral-500)" />
                  )}
                </div>
                
                <p style={{
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--neutral-600)',
                  margin: '0 0 var(--space-3) 0',
                  lineHeight: 1.4,
                }}>
                  {room.description}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
                      <Users size={14} color="var(--neutral-500)" />
                      <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--neutral-500)' }}>
                        {room.members}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
                      <Clock size={14} color="var(--neutral-500)" />
                      <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--neutral-500)' }}>
                        {room.lastActivity}
                      </span>
                    </div>
                  </div>
                  <span style={{
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--primary-600)',
                    background: 'var(--primary-100)',
                    padding: 'var(--space-1) var(--space-2)',
                    borderRadius: 'var(--radius-md)',
                  }}>
                    {room.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {selectedRoom ? (
            <>
              {/* Chat Header */}
              <div style={{
                padding: 'var(--space-6)',
                borderBottom: '1px solid var(--neutral-200)',
                background: 'white',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'var(--gradient-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <MessageCircle size={24} color="white" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h2 style={{ margin: '0 0 var(--space-1) 0', fontSize: 'var(--font-size-xl)' }}>
                      {selectedRoom.name}
                    </h2>
                    <p style={{ 
                      margin: 0, 
                      fontSize: 'var(--font-size-sm)', 
                      color: 'var(--neutral-600)',
                    }}>
                      {selectedRoom.members} members • {selectedRoom.isActive ? 'Active now' : selectedRoom.lastActivity}
                    </p>
                  </div>
                  <button className="btn btn-secondary btn-sm">
                    <UserPlus size={16} />
                    Join Room
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: 'var(--space-6)',
                background: 'linear-gradient(135deg, var(--primary-50) 0%, var(--secondary-50) 100%)',
              }}>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    style={{
                      marginBottom: 'var(--space-4)',
                      maxWidth: '80%',
                    }}
                  >
                    <div style={{
                      background: 'white',
                      padding: 'var(--space-4)',
                      borderRadius: 'var(--radius-xl)',
                      boxShadow: 'var(--shadow-sm)',
                      border: '1px solid var(--neutral-200)',
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 'var(--space-2)',
                        marginBottom: 'var(--space-2)',
                      }}>
                        <div style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: 'var(--gradient-primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 'var(--font-size-xs)',
                          color: 'white',
                        }}>
                          {message.user.charAt(0)}
                        </div>
                        <span style={{ 
                          fontSize: 'var(--font-size-sm)', 
                          fontWeight: '600',
                          color: 'var(--neutral-700)',
                        }}>
                          {message.user}
                        </span>
                        <span style={{ 
                          fontSize: 'var(--font-size-xs)', 
                          color: 'var(--neutral-500)',
                          marginLeft: 'auto',
                        }}>
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                      <p style={{ 
                        margin: 0, 
                        lineHeight: 1.5,
                        color: 'var(--neutral-800)',
                      }}>
                        {message.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div style={{
                padding: 'var(--space-6)',
                borderTop: '1px solid var(--neutral-200)',
                background: 'white',
              }}>
                <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-end' }}>
                  <div style={{ flex: 1 }}>
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Share your thoughts with the community..."
                      className="input"
                      style={{ minHeight: '60px', resize: 'vertical' }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="btn btn-primary"
                    style={{
                      padding: 'var(--space-4)',
                      height: '60px',
                      opacity: !newMessage.trim() ? 0.5 : 1,
                    }}
                  >
                    <Send size={20} />
                  </button>
                </div>
                <p style={{
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--neutral-500)',
                  margin: 'var(--space-2) 0 0 0',
                  textAlign: 'center',
                }}>
                  Your identity remains anonymous. Be kind and supportive.
                </p>
              </div>
            </>
          ) : (
            /* Welcome Screen */
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, var(--primary-50) 0%, var(--secondary-50) 100%)',
            }}>
              <div style={{ textAlign: 'center', maxWidth: '500px', padding: 'var(--space-8)' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'var(--gradient-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto var(--space-6) auto',
                }}>
                  <Heart size={40} color="white" />
                </div>
                <h2 style={{ marginBottom: 'var(--space-4)' }}>
                  Welcome to Support Rooms
                </h2>
                <p style={{ 
                  fontSize: 'var(--font-size-lg)',
                  color: 'var(--neutral-600)',
                  marginBottom: 'var(--space-8)',
                  lineHeight: 1.6,
                }}>
                  Join anonymous, supportive communities where you can share experiences, 
                  find understanding, and connect with others on similar journeys.
                </p>
                <div className="grid grid-cols-1 gap-4" style={{ maxWidth: '400px', margin: '0 auto' }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 'var(--space-3)',
                    padding: 'var(--space-4)',
                    background: 'white',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-sm)',
                  }}>
                    <Shield size={24} color="var(--primary-500)" />
                    <span style={{ fontSize: 'var(--font-size-sm)' }}>
                      100% Anonymous & Safe
                    </span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 'var(--space-3)',
                    padding: 'var(--space-4)',
                    background: 'white',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-sm)',
                  }}>
                    <Users size={24} color="var(--success-500)" />
                    <span style={{ fontSize: 'var(--font-size-sm)' }}>
                      Supportive Community
                    </span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 'var(--space-3)',
                    padding: 'var(--space-4)',
                    background: 'white',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-sm)',
                  }}>
                    <Heart size={24} color="var(--error-500)" />
                    <span style={{ fontSize: 'var(--font-size-sm)' }}>
                      Judgment-Free Space
                    </span>
                  </div>
                </div>
                <p style={{
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--neutral-500)',
                  marginTop: 'var(--space-6)',
                  fontStyle: 'italic',
                }}>
                  Select a room from the sidebar to join the conversation
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}