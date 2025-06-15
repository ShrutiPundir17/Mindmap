import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { 
  Smile, 
  Frown, 
  Meh, 
  Heart, 
  TrendingUp,
  Calendar,
  Plus,
  BarChart3
} from 'lucide-react';
import { format, subDays, isToday } from 'date-fns';

const moodOptions = [
  { name: 'ecstatic', emoji: '🤩', color: 'var(--success-500)', value: 10 },
  { name: 'happy', emoji: '😊', color: 'var(--success-400)', value: 9 },
  { name: 'good', emoji: '😌', color: 'var(--success-300)', value: 8 },
  { name: 'okay', emoji: '😐', color: 'var(--warning-400)', value: 7 },
  { name: 'meh', emoji: '😑', color: 'var(--neutral-400)', value: 6 },
  { name: 'down', emoji: '😔', color: 'var(--warning-500)', value: 5 },
  { name: 'sad', emoji: '😢', color: 'var(--error-400)', value: 4 },
  { name: 'anxious', emoji: '😰', color: 'var(--error-500)', value: 3 },
  { name: 'stressed', emoji: '😫', color: 'var(--error-600)', value: 2 },
  { name: 'terrible', emoji: '😭', color: 'var(--error-700)', value: 1 },
];

export default function MoodTracker() {
  const { state, addMoodEntry } = useApp();
  const { moods } = state;
  const [selectedMood, setSelectedMood] = useState('');
  const [intensity, setIntensity] = useState(5);
  const [notes, setNotes] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMood) {
      addMoodEntry(selectedMood, intensity, notes);
      setSelectedMood('');
      setIntensity(5);
      setNotes('');
      setShowForm(false);
    }
  };

  // Generate chart data for the last 7 days
  const chartData = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i);
    const dayMoods = moods.filter(mood => 
      format(mood.timestamp, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
    const avgMood = dayMoods.length > 0 
      ? dayMoods.reduce((acc, mood) => acc + mood.intensity, 0) / dayMoods.length
      : 0;
    
    return {
      date: format(date, 'MMM dd'),
      mood: avgMood,
      isToday: isToday(date),
    };
  });

  const todaysMood = moods.find(mood => isToday(mood.timestamp));
  const avgMoodThisWeek = chartData.filter(d => d.mood > 0).length > 0
    ? chartData.filter(d => d.mood > 0).reduce((acc, d) => acc + d.mood, 0) / chartData.filter(d => d.mood > 0).length
    : 0;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 'var(--space-8)',
      }}>
        <div>
          <h1 style={{ 
            fontSize: 'var(--font-size-4xl)',
            fontWeight: '700',
            marginBottom: 'var(--space-2)',
            background: 'var(--gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Mood Tracker
          </h1>
          <p style={{ 
            fontSize: 'var(--font-size-lg)',
            color: 'var(--neutral-600)',
            margin: 0,
          }}>
            Track and understand your emotional patterns
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary btn-lg"
        >
          <Plus size={20} />
          Log Mood
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-6" style={{ marginBottom: 'var(--space-8)' }}>
        <div className="card" style={{ textAlign: 'center', background: 'var(--success-50)', border: '1px solid var(--success-200)' }}>
          <Heart size={32} color="var(--success-500)" style={{ margin: '0 auto var(--space-3) auto' }} />
          <h3 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: '700', color: 'var(--success-600)', margin: '0 0 var(--space-2) 0' }}>
            {avgMoodThisWeek.toFixed(1)}/10
          </h3>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--neutral-600)', margin: 0 }}>
            Average This Week
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center', background: 'var(--primary-50)', border: '1px solid var(--primary-200)' }}>
          <TrendingUp size={32} color="var(--primary-500)" style={{ margin: '0 auto var(--space-3) auto' }} />
          <h3 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: '700', color: 'var(--primary-600)', margin: '0 0 var(--space-2) 0' }}>
            {moods.length}
          </h3>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--neutral-600)', margin: 0 }}>
            Total Check-ins
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center', background: 'var(--secondary-50)', border: '1px solid var(--secondary-200)' }}>
          <Calendar size={32} color="var(--secondary-500)" style={{ margin: '0 auto var(--space-3) auto' }} />
          <h3 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: '700', color: 'var(--secondary-600)', margin: '0 0 var(--space-2) 0' }}>
            {todaysMood ? '✓' : '–'}
          </h3>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--neutral-600)', margin: 0 }}>
            Logged Today
          </p>
        </div>
      </div>

      {/* Mood Entry Form */}
      {showForm && (
        <div className="card" style={{ marginBottom: 'var(--space-8)', background: 'var(--primary-50)', border: '1px solid var(--primary-200)' }}>
          <h3 style={{ marginBottom: 'var(--space-6)' }}>How are you feeling right now?</h3>
          
          <form onSubmit={handleSubmit}>
            {/* Mood Selection */}
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <label style={{ 
                display: 'block',
                fontSize: 'var(--font-size-sm)',
                fontWeight: '600',
                color: 'var(--neutral-700)',
                marginBottom: 'var(--space-3)',
              }}>
                Select your mood:
              </label>
              <div className="grid grid-cols-5 gap-3">
                {moodOptions.map((mood) => (
                  <button
                    key={mood.name}
                    type="button"
                    onClick={() => setSelectedMood(mood.name)}
                    style={{
                      padding: 'var(--space-4)',
                      borderRadius: 'var(--radius-lg)',
                      border: selectedMood === mood.name 
                        ? `2px solid ${mood.color}` 
                        : '2px solid var(--neutral-200)',
                      background: selectedMood === mood.name 
                        ? `${mood.color}20` 
                        : 'white',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <span style={{ fontSize: '24px' }}>{mood.emoji}</span>
                    <span style={{ 
                      fontSize: 'var(--font-size-xs)',
                      fontWeight: '500',
                      textTransform: 'capitalize',
                      color: selectedMood === mood.name ? mood.color : 'var(--neutral-600)',
                    }}>
                      {mood.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Intensity Slider */}
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <label style={{ 
                display: 'block',
                fontSize: 'var(--font-size-sm)',
                fontWeight: '600',
                color: 'var(--neutral-700)',
                marginBottom: 'var(--space-3)',
              }}>
                Intensity: {intensity}/10
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={intensity}
                onChange={(e) => setIntensity(parseInt(e.target.value))}
                style={{
                  width: '100%',
                  height: '8px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--neutral-200)',
                  outline: 'none',
                  appearance: 'none',
                }}
              />
            </div>

            {/* Notes */}
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <label style={{ 
                display: 'block',
                fontSize: 'var(--font-size-sm)',
                fontWeight: '600',
                color: 'var(--neutral-700)',
                marginBottom: 'var(--space-3)',
              }}>
                Notes (optional):
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="What's contributing to this mood? Any thoughts you'd like to capture?"
                className="input"
                style={{ minHeight: '100px', resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={!selectedMood}
                style={{ opacity: !selectedMood ? 0.5 : 1 }}
              >
                Save Entry
              </button>
              <button 
                type="button" 
                onClick={() => setShowForm(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Mood Chart */}
      <div className="grid grid-cols-2 gap-8">
        <div className="card">
          <h3 style={{ marginBottom: 'var(--space-6)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <BarChart3 size={24} />
            7-Day Mood Trend
          </h3>
          <div style={{ height: '200px', display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: 'var(--space-2)' }}>
            {chartData.map((day, index) => (
              <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)' }}>
                <div
                  style={{
                    width: '100%',
                    height: `${(day.mood / 10) * 160}px`,
                    background: day.mood > 0 
                      ? (day.mood >= 7 ? 'var(--success-400)' : day.mood >= 4 ? 'var(--warning-400)' : 'var(--error-400)')
                      : 'var(--neutral-200)',
                    borderRadius: 'var(--radius-md)',
                    minHeight: '20px',
                    display: 'flex',
                    alignItems: 'end',
                    justifyContent: 'center',
                    paddingBottom: 'var(--space-1)',
                    color: 'white',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: '600',
                    border: day.isToday ? '2px solid var(--primary-500)' : 'none',
                  }}
                >
                  {day.mood > 0 && Math.round(day.mood)}
                </div>
                <span style={{ 
                  fontSize: 'var(--font-size-xs)', 
                  color: day.isToday ? 'var(--primary-600)' : 'var(--neutral-500)',
                  fontWeight: day.isToday ? '600' : '400',
                }}>
                  {day.date}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Entries */}
        <div className="card">
          <h3 style={{ marginBottom: 'var(--space-6)' }}>Recent Entries</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxHeight: '240px', overflowY: 'auto' }}>
            {moods.slice(0, 5).map((mood) => {
              const moodData = moodOptions.find(m => m.name === mood.mood);
              return (
                <div 
                  key={mood.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-3)',
                    padding: 'var(--space-3)',
                    background: 'var(--neutral-50)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--neutral-200)',
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: moodData?.color || 'var(--neutral-400)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                  }}>
                    {moodData?.emoji || '😐'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-1)' }}>
                      <span style={{ fontWeight: '600', textTransform: 'capitalize' }}>
                        {mood.mood}
                      </span>
                      <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--neutral-500)' }}>
                        {format(mood.timestamp, 'MMM dd, h:mm a')}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--neutral-600)' }}>
                        Intensity: {mood.intensity}/10
                      </span>
                    </div>
                    {mood.notes && (
                      <p style={{ 
                        fontSize: 'var(--font-size-sm)', 
                        color: 'var(--neutral-600)',
                        fontStyle: 'italic',
                        margin: 'var(--space-1) 0 0 0',
                      }}>
                        "{mood.notes}"
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
            {moods.length === 0 && (
              <p style={{ textAlign: 'center', color: 'var(--neutral-500)', fontStyle: 'italic' }}>
                No mood entries yet. Start tracking to see patterns!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}