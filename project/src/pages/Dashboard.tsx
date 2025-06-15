import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import { 
  TrendingUp, 
  Calendar, 
  Target, 
  MessageCircle,
  Smile,
  Award,
  Activity,
  Users,
  Plus,
  ArrowRight
} from 'lucide-react';

export default function Dashboard() {
  const { state } = useApp();
  const { state: authState } = useAuth();
  const { moods, habits } = state;
  const user = authState.user!;

  const completedHabits = habits.filter(h => h.completed).length;
  const totalHabits = habits.length;
  const recentMood = moods[0];
  const avgMoodScore = moods.length > 0 
    ? Math.round(moods.reduce((acc, mood) => acc + mood.intensity, 0) / moods.length)
    : 0;

  const quickStats = [
    {
      label: 'Mood Score',
      value: avgMoodScore || '–',
      max: avgMoodScore ? 10 : null,
      icon: Smile,
      color: 'var(--success-500)',
      bgColor: 'var(--success-50)',
    },
    {
      label: 'Habits Today',
      value: completedHabits,
      max: totalHabits || null,
      icon: Target,
      color: 'var(--primary-500)',
      bgColor: 'var(--primary-50)',
    },
    {
      label: 'Streak Days',
      value: habits.length > 0 ? Math.max(...habits.map(h => h.streak)) : 0,
      max: null,
      icon: Award,
      color: 'var(--warning-500)',
      bgColor: 'var(--warning-50)',
    },
    {
      label: 'Check-ins',
      value: moods.length,
      max: null,
      icon: Activity,
      color: 'var(--secondary-500)',
      bgColor: 'var(--secondary-50)',
    },
  ];

  const quickActions = [
    {
      title: 'Chat with AI',
      description: 'Talk about how you\'re feeling',
      link: '/chat',
      icon: MessageCircle,
      color: 'var(--primary-500)',
    },
    {
      title: 'Track Mood',
      description: 'Log your current mood',
      link: '/mood',
      icon: Smile,
      color: 'var(--success-500)',
    },
    {
      title: 'Build Habits',
      description: 'Create healthy routines',
      link: '/habits',
      icon: Target,
      color: 'var(--warning-500)',
    },
    {
      title: 'Join Support',
      description: 'Connect with others',
      link: '/support',
      icon: Users,
      color: 'var(--secondary-500)',
    },
  ];

  const isNewUser = moods.length === 0 && habits.length === 0;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h1 style={{ 
          fontSize: 'var(--font-size-4xl)',
          fontWeight: '700',
          marginBottom: 'var(--space-2)',
          background: 'var(--gradient-primary)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          Welcome back, {user.name}! 👋
        </h1>
        <p style={{ 
          fontSize: 'var(--font-size-lg)',
          color: 'var(--neutral-600)',
          margin: 0,
        }}>
          {isNewUser 
            ? "Let's start your wellness journey together" 
            : "Here's how you're doing today"
          }
        </p>
      </div>

      {/* New User Welcome */}
      {isNewUser && (
        <div className="card" style={{
          marginBottom: 'var(--space-8)',
          background: 'var(--gradient-primary)',
          color: 'white',
          textAlign: 'center',
        }}>
          <h2 style={{ marginBottom: 'var(--space-4)', color: 'white' }}>
            🎉 Welcome to MindMate!
          </h2>
          <p style={{ 
            fontSize: 'var(--font-size-lg)',
            marginBottom: 'var(--space-6)',
            opacity: 0.9,
          }}>
            You're taking the first step towards better mental wellness. Let's get you started with some simple actions.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link 
              to="/mood" 
              className="btn"
              style={{
                background: 'white',
                color: 'var(--primary-600)',
                fontWeight: '600',
              }}
            >
              <Plus size={20} />
              Log Your First Mood
            </Link>
            <Link 
              to="/chat" 
              className="btn"
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              <MessageCircle size={20} />
              Start Chatting
            </Link>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-6" style={{ marginBottom: 'var(--space-8)' }}>
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index}
              className="card"
              style={{
                background: stat.bgColor,
                border: `1px solid ${stat.color}20`,
                textAlign: 'center',
              }}
            >
              <div 
                style={{
                  width: '48px',
                  height: '48px',
                  background: stat.color,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto var(--space-4) auto',
                }}
              >
                <Icon size={24} color="white" />
              </div>
              <h3 style={{
                fontSize: 'var(--font-size-2xl)',
                fontWeight: '700',
                color: stat.color,
                margin: '0 0 var(--space-2) 0',
              }}>
                {stat.value}{stat.max ? `/${stat.max}` : ''}
              </h3>
              <p style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--neutral-600)',
                margin: 0,
                fontWeight: '500',
              }}>
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h2 style={{ marginBottom: 'var(--space-6)' }}>Quick Actions</h2>
        <div className="grid grid-cols-2 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link
                key={index}
                to={action.link}
                className="card"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  background: `linear-gradient(135deg, ${action.color}10 0%, ${action.color}05 100%)`,
                  border: `1px solid ${action.color}20`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                  <div 
                    style={{
                      width: '56px',
                      height: '56px',
                      background: action.color,
                      borderRadius: 'var(--radius-xl)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={28} color="white" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: 'var(--font-size-lg)',
                      fontWeight: '600',
                      margin: '0 0 var(--space-1) 0',
                      color: 'var(--neutral-800)',
                    }}>
                      {action.title}
                    </h3>
                    <p style={{
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--neutral-600)',
                      margin: 0,
                    }}>
                      {action.description}
                    </p>
                  </div>
                  <ArrowRight size={20} color="var(--neutral-400)" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      {!isNewUser && (
        <div className="grid grid-cols-2 gap-8">
          {/* Recent Mood */}
          <div className="card">
            <h3 style={{ marginBottom: 'var(--space-4)' }}>Recent Mood Check-in</h3>
            {recentMood ? (
              <div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 'var(--space-3)',
                  marginBottom: 'var(--space-3)',
                }}>
                  <div 
                    style={{
                      width: '40px',
                      height: '40px',
                      background: 'var(--success-100)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 'var(--font-size-lg)',
                    }}
                  >
                    {recentMood.mood === 'happy' ? '😊' :
                     recentMood.mood === 'calm' ? '😌' :
                     recentMood.mood === 'stressed' ? '😰' : '😐'}
                  </div>
                  <div>
                    <p style={{ 
                      fontWeight: '600',
                      margin: '0 0 var(--space-1) 0',
                      textTransform: 'capitalize',
                    }}>
                      {recentMood.mood}
                    </p>
                    <p style={{
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--neutral-500)',
                      margin: 0,
                    }}>
                      Intensity: {recentMood.intensity}/10
                    </p>
                  </div>
                </div>
                <p style={{
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--neutral-600)',
                  fontStyle: 'italic',
                }}>
                  "{recentMood.notes}"
                </p>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: 'var(--space-6)', color: 'var(--neutral-500)' }}>
                <Smile size={32} style={{ margin: '0 auto var(--space-3) auto', opacity: 0.5 }} />
                <p>No mood entries yet</p>
                <Link to="/mood" className="btn btn-sm btn-primary" style={{ marginTop: 'var(--space-3)' }}>
                  <Plus size={16} />
                  Add First Mood
                </Link>
              </div>
            )}
          </div>

          {/* Habit Progress */}
          <div className="card">
            <h3 style={{ marginBottom: 'var(--space-4)' }}>Today's Habits</h3>
            {habits.length > 0 ? (
              <>
                <div style={{ marginBottom: 'var(--space-4)' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 'var(--space-2)',
                  }}>
                    <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--neutral-600)' }}>
                      Progress
                    </span>
                    <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: '600' }}>
                      {completedHabits}/{totalHabits}
                    </span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    background: 'var(--neutral-200)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${totalHabits > 0 ? (completedHabits / totalHabits) * 100 : 0}%`,
                      height: '100%',
                      background: 'var(--gradient-primary)',
                      transition: 'width 0.3s ease',
                    }} />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  {habits.slice(0, 3).map((habit) => (
                    <div 
                      key={habit.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-3)',
                      }}
                    >
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: habit.completed ? 'var(--success-500)' : 'var(--neutral-300)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        {habit.completed && <span style={{ color: 'white', fontSize: '12px' }}>✓</span>}
                      </div>
                      <span style={{
                        fontSize: 'var(--font-size-sm)',
                        color: habit.completed ? 'var(--neutral-600)' : 'var(--neutral-800)',
                        textDecoration: habit.completed ? 'line-through' : 'none',
                      }}>
                        {habit.name}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: 'var(--space-6)', color: 'var(--neutral-500)' }}>
                <Target size={32} style={{ margin: '0 auto var(--space-3) auto', opacity: 0.5 }} />
                <p>No habits yet</p>
                <Link to="/habits" className="btn btn-sm btn-primary" style={{ marginTop: 'var(--space-3)' }}>
                  <Plus size={16} />
                  Create First Habit
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}