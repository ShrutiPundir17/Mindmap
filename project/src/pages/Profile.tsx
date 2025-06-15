import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  Download,
  Trash2,
  Edit3,
  Calendar,
  Award,
  TrendingUp,
  Heart
} from 'lucide-react';
import { format } from 'date-fns';

export default function Profile() {
  const { state } = useApp();
  const { state: authState } = useAuth();
  const { moods, habits } = state;
  const user = authState.user!;
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name);

  const totalMoodEntries = moods.length;
  const totalHabits = habits.length;
  const completedHabits = habits.filter(h => h.completed).length;
  const longestStreak = habits.length > 0 ? Math.max(...habits.map(h => h.streak)) : 0;
  const avgMoodScore = moods.length > 0 
    ? (moods.reduce((acc, mood) => acc + mood.intensity, 0) / moods.length).toFixed(1)
    : '0';

  const achievements = [
    {
      title: 'First Steps',
      description: 'Completed your first mood check-in',
      earned: totalMoodEntries > 0,
      icon: '🎯',
    },
    {
      title: 'Habit Builder',
      description: 'Created your first habit',
      earned: totalHabits > 0,
      icon: '🏗️',
    },
    {
      title: 'Streak Master',
      description: 'Maintained a 7-day habit streak',
      earned: longestStreak >= 7,
      icon: '🔥',
    },
    {
      title: 'Mood Tracker',
      description: 'Logged 10 mood entries',
      earned: totalMoodEntries >= 10,
      icon: '📊',
    },
    {
      title: 'Consistency Champion',
      description: 'Completed all habits for a day',
      earned: totalHabits > 0 && completedHabits === totalHabits,
      icon: '👑',
    },
    {
      title: 'Community Member',
      description: 'Joined a support room',
      earned: false, // This would be tracked in real implementation
      icon: '🤝',
    },
  ];

  const earnedAchievements = achievements.filter(a => a.earned);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'stats', label: 'Statistics', icon: TrendingUp },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

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
          Profile
        </h1>
        <p style={{ 
          fontSize: 'var(--font-size-lg)',
          color: 'var(--neutral-600)',
          margin: 0,
        }}>
          Manage your account and view your wellness journey
        </p>
      </div>

      {/* Profile Header Card */}
      <div className="card" style={{ marginBottom: 'var(--space-8)', background: 'var(--gradient-primary)', color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }}>
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'var(--font-size-4xl)',
            border: '3px solid rgba(255, 255, 255, 0.3)',
          }}>
            {user.avatar}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
              {isEditing ? (
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--space-2) var(--space-3)',
                    color: 'white',
                    fontSize: 'var(--font-size-2xl)',
                    fontWeight: '700',
                  }}
                  onBlur={() => setIsEditing(false)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      setIsEditing(false);
                    }
                  }}
                  autoFocus
                />
              ) : (
                <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: '700', margin: 0 }}>
                  {user.name}
                </h2>
              )}
              <button
                onClick={() => setIsEditing(!isEditing)}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-2)',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                <Edit3 size={16} />
              </button>
            </div>
            <p style={{ fontSize: 'var(--font-size-base)', opacity: 0.9, margin: 0 }}>
              Member since {format(user.joinedDate, 'MMMM yyyy')}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: '700', marginBottom: 'var(--space-1)' }}>
              {earnedAchievements.length}
            </div>
            <div style={{ fontSize: 'var(--font-size-sm)', opacity: 0.9 }}>
              Achievements
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <div style={{ 
          display: 'flex', 
          gap: 'var(--space-2)',
          borderBottom: '1px solid var(--neutral-200)',
        }}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  padding: 'var(--space-3) var(--space-4)',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? '2px solid var(--primary-500)' : '2px solid transparent',
                  color: activeTab === tab.id ? 'var(--primary-600)' : 'var(--neutral-600)',
                  fontWeight: activeTab === tab.id ? '600' : '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-2 gap-8">
          <div className="card">
            <h3 style={{ marginBottom: 'var(--space-6)' }}>Personal Information</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div>
                <label style={{ 
                  display: 'block',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: '600',
                  color: 'var(--neutral-700)',
                  marginBottom: 'var(--space-2)',
                }}>
                  Display Name
                </label>
                <input
                  type="text"
                  value={user.name}
                  className="input"
                  readOnly
                />
              </div>
              <div>
                <label style={{ 
                  display: 'block',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: '600',
                  color: 'var(--neutral-700)',
                  marginBottom: 'var(--space-2)',
                }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={user.email}
                  className="input"
                  readOnly
                />
              </div>
              <div>
                <label style={{ 
                  display: 'block',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: '600',
                  color: 'var(--neutral-700)',
                  marginBottom: 'var(--space-2)',
                }}>
                  Member Since
                </label>
                <input
                  type="text"
                  value={format(user.joinedDate, 'MMMM dd, yyyy')}
                  className="input"
                  readOnly
                />
              </div>
              <div>
                <label style={{ 
                  display: 'block',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: '600',
                  color: 'var(--neutral-700)',
                  marginBottom: 'var(--space-2)',
                }}>
                  Avatar
                </label>
                <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                  {['👤', '😊', '🌟', '🦋', '🌸', '🎯'].map((emoji) => (
                    <button
                      key={emoji}
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        border: user.avatar === emoji ? '2px solid var(--primary-500)' : '1px solid var(--neutral-300)',
                        background: user.avatar === emoji ? 'var(--primary-50)' : 'white',
                        fontSize: '20px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: 'var(--space-6)' }}>Quick Stats</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--neutral-600)' }}>Mood Entries</span>
                <span style={{ fontWeight: '600', fontSize: 'var(--font-size-lg)' }}>{totalMoodEntries}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--neutral-600)' }}>Active Habits</span>
                <span style={{ fontWeight: '600', fontSize: 'var(--font-size-lg)' }}>{totalHabits}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--neutral-600)' }}>Best Streak</span>
                <span style={{ fontWeight: '600', fontSize: 'var(--font-size-lg)' }}>{longestStreak} days</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--neutral-600)' }}>Avg Mood Score</span>
                <span style={{ fontWeight: '600', fontSize: 'var(--font-size-lg)' }}>{avgMoodScore}/10</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'stats' && (
        <div className="grid grid-cols-3 gap-6">
          <div className="card" style={{ textAlign: 'center', background: 'var(--primary-50)', border: '1px solid var(--primary-200)' }}>
            <Heart size={32} color="var(--primary-500)" style={{ margin: '0 auto var(--space-3) auto' }} />
            <h3 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: '700', color: 'var(--primary-600)', margin: '0 0 var(--space-2) 0' }}>
              {avgMoodScore}
            </h3>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--neutral-600)', margin: 0 }}>
              Average Mood Score
            </p>
          </div>

          <div className="card" style={{ textAlign: 'center', background: 'var(--success-50)', border: '1px solid var(--success-200)' }}>
            <Calendar size={32} color="var(--success-500)" style={{ margin: '0 auto var(--space-3) auto' }} />
            <h3 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: '700', color: 'var(--success-600)', margin: '0 0 var(--space-2) 0' }}>
              {totalMoodEntries}
            </h3>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--neutral-600)', margin: 0 }}>
              Total Check-ins
            </p>
          </div>

          <div className="card" style={{ textAlign: 'center', background: 'var(--warning-50)', border: '1px solid var(--warning-200)' }}>
            <TrendingUp size={32} color="var(--warning-500)" style={{ margin: '0 auto var(--space-3) auto' }} />
            <h3 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: '700', color: 'var(--warning-600)', margin: '0 0 var(--space-2) 0' }}>
              {longestStreak}
            </h3>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--neutral-600)', margin: 0 }}>
              Longest Streak
            </p>
          </div>
        </div>
      )}

      {activeTab === 'achievements' && (
        <div className="grid grid-cols-2 gap-6">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className="card"
              style={{
                background: achievement.earned ? 'var(--success-50)' : 'var(--neutral-50)',
                border: achievement.earned ? '1px solid var(--success-200)' : '1px solid var(--neutral-200)',
                opacity: achievement.earned ? 1 : 0.6,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: achievement.earned ? 'var(--success-100)' : 'var(--neutral-200)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                }}>
                  {achievement.earned ? achievement.icon : '🔒'}
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: '600',
                    margin: '0 0 var(--space-1) 0',
                    color: achievement.earned ? 'var(--success-700)' : 'var(--neutral-600)',
                  }}>
                    {achievement.title}
                  </h4>
                  <p style={{
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--neutral-600)',
                    margin: 0,
                  }}>
                    {achievement.description}
                  </p>
                </div>
                {achievement.earned && (
                  <div style={{
                    background: 'var(--success-500)',
                    color: 'white',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                  }}>
                    ✓
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="grid grid-cols-2 gap-8">
          <div className="card">
            <h3 style={{ marginBottom: 'var(--space-6)' }}>Notifications</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: 'var(--font-size-base)', fontWeight: '600', margin: 0 }}>
                    Daily Mood Reminders
                  </h4>
                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--neutral-600)', margin: 0 }}>
                    Get reminded to log your mood
                  </p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: 'var(--font-size-base)', fontWeight: '600', margin: 0 }}>
                    Habit Reminders
                  </h4>
                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--neutral-600)', margin: 0 }}>
                    Get reminded about your habits
                  </p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: 'var(--font-size-base)', fontWeight: '600', margin: 0 }}>
                    Support Room Updates
                  </h4>
                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--neutral-600)', margin: 0 }}>
                    Get notified about room activity
                  </p>
                </div>
                <input type="checkbox" />
              </div>
            </div>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: 'var(--space-6)' }}>Data & Privacy</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <button className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
                <Download size={18} />
                Export My Data
              </button>
              <button className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
                <Shield size={18} />
                Privacy Settings
              </button>
              <button className="btn" style={{ 
                justifyContent: 'flex-start',
                background: 'var(--error-500)',
                color: 'white',
              }}>
                <Trash2 size={18} />
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}