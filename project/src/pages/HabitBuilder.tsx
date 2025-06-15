import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { 
  Target, 
  Plus, 
  CheckCircle2, 
  Circle, 
  Calendar, 
  Flame,
  Brain,
  Heart,
  Dumbbell,
  Book,
  Coffee,
  Music
} from 'lucide-react';

const habitCategories = [
  { id: 'mindfulness', name: 'Mindfulness', icon: Brain, color: 'var(--primary-500)' },
  { id: 'exercise', name: 'Exercise', icon: Dumbbell, color: 'var(--success-500)' },
  { id: 'journaling', name: 'Journaling', icon: Book, color: 'var(--secondary-500)' },
  { id: 'selfcare', name: 'Self Care', icon: Heart, color: 'var(--warning-500)' },
  { id: 'learning', name: 'Learning', icon: Coffee, color: 'var(--error-500)' },
  { id: 'creative', name: 'Creative', icon: Music, color: 'var(--neutral-500)' },
];

const suggestedHabits = [
  { name: 'Morning Meditation', description: '10 minutes of mindfulness', category: 'mindfulness' },
  { name: 'Gratitude Journal', description: 'Write 3 things you\'re grateful for', category: 'journaling' },
  { name: 'Evening Walk', description: '20-minute walk in nature', category: 'exercise' },
  { name: 'Deep Breathing', description: '5 minutes of deep breathing exercises', category: 'mindfulness' },
  { name: 'Read for Pleasure', description: '15 minutes of reading', category: 'learning' },
  { name: 'Hydration Check', description: 'Drink 8 glasses of water', category: 'selfcare' },
  { name: 'Digital Detox', description: '1 hour without screens before bed', category: 'selfcare' },
  { name: 'Creative Writing', description: 'Write for 15 minutes', category: 'creative' },
];

export default function HabitBuilder() {
  const { state, addHabit, toggleHabit } = useApp();
  const { habits } = state;
  const [showForm, setShowForm] = useState(false);
  const [newHabit, setNewHabit] = useState({
    name: '',
    description: '',
    category: 'mindfulness',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newHabit.name.trim()) {
      addHabit(newHabit);
      setNewHabit({ name: '', description: '', category: 'mindfulness' });
      setShowForm(false);
    }
  };

  const addSuggestedHabit = (habit: typeof suggestedHabits[0]) => {
    addHabit(habit);
  };

  const completedToday = habits.filter(h => h.completed).length;
  const totalHabits = habits.length;
  const maxStreak = Math.max(...habits.map(h => h.streak), 0);
  const averageCompletion = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

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
            Habit Builder
          </h1>
          <p style={{ 
            fontSize: 'var(--font-size-lg)',
            color: 'var(--neutral-600)',
            margin: 0,
          }}>
            Build positive habits for better mental wellness
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary btn-lg"
        >
          <Plus size={20} />
          Add Habit
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6" style={{ marginBottom: 'var(--space-8)' }}>
        <div className="card" style={{ textAlign: 'center', background: 'var(--primary-50)', border: '1px solid var(--primary-200)' }}>
          <Target size={32} color="var(--primary-500)" style={{ margin: '0 auto var(--space-3) auto' }} />
          <h3 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: '700', color: 'var(--primary-600)', margin: '0 0 var(--space-2) 0' }}>
            {completedToday}/{totalHabits}
          </h3>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--neutral-600)', margin: 0 }}>
            Completed Today
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center', background: 'var(--success-50)', border: '1px solid var(--success-200)' }}>
          <CheckCircle2 size={32} color="var(--success-500)" style={{ margin: '0 auto var(--space-3) auto' }} />
          <h3 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: '700', color: 'var(--success-600)', margin: '0 0 var(--space-2) 0' }}>
            {averageCompletion}%
          </h3>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--neutral-600)', margin: 0 }}>
            Completion Rate
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center', background: 'var(--warning-50)', border: '1px solid var(--warning-200)' }}>
          <Flame size={32} color="var(--warning-500)" style={{ margin: '0 auto var(--space-3) auto' }} />
          <h3 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: '700', color: 'var(--warning-600)', margin: '0 0 var(--space-2) 0' }}>
            {maxStreak}
          </h3>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--neutral-600)', margin: 0 }}>
            Best Streak
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center', background: 'var(--secondary-50)', border: '1px solid var(--secondary-200)' }}>
          <Calendar size={32} color="var(--secondary-500)" style={{ margin: '0 auto var(--space-3) auto' }} />
          <h3 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: '700', color: 'var(--secondary-600)', margin: '0 0 var(--space-2) 0' }}>
            {totalHabits}
          </h3>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--neutral-600)', margin: 0 }}>
            Total Habits
          </p>
        </div>
      </div>

      {/* Add Habit Form */}
      {showForm && (
        <div className="card" style={{ marginBottom: 'var(--space-8)', background: 'var(--primary-50)', border: '1px solid var(--primary-200)' }}>
          <h3 style={{ marginBottom: 'var(--space-6)' }}>Create a New Habit</h3>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label style={{ 
                  display: 'block',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: '600',
                  color: 'var(--neutral-700)',
                  marginBottom: 'var(--space-3)',
                }}>
                  Habit Name
                </label>
                <input
                  type="text"
                  value={newHabit.name}
                  onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
                  placeholder="e.g., Morning Meditation"
                  className="input"
                  required
                />
              </div>

              <div>
                <label style={{ 
                  display: 'block',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: '600',
                  color: 'var(--neutral-700)',
                  marginBottom: 'var(--space-3)',
                }}>
                  Category
                </label>
                <select
                  value={newHabit.category}
                  onChange={(e) => setNewHabit({ ...newHabit, category: e.target.value })}
                  className="input"
                >
                  {habitCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ marginTop: 'var(--space-4)' }}>
              <label style={{ 
                display: 'block',
                fontSize: 'var(--font-size-sm)',
                fontWeight: '600',
                color: 'var(--neutral-700)',
                marginBottom: 'var(--space-3)',
              }}>
                Description
              </label>
              <textarea
                value={newHabit.description}
                onChange={(e) => setNewHabit({ ...newHabit, description: e.target.value })}
                placeholder="Describe your habit and any specific goals..."
                className="input"
                style={{ minHeight: '80px' }}
              />
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
              <button type="submit" className="btn btn-primary">
                Add Habit
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

      <div className="grid grid-cols-2 gap-8">
        {/* Current Habits */}
        <div className="card">
          <h3 style={{ marginBottom: 'var(--space-6)' }}>Today's Habits</h3>
          
          {habits.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {habits.map((habit) => {
                const category = habitCategories.find(c => c.id === habit.category);
                const Icon = category?.icon || Target;
                
                return (
                  <div 
                    key={habit.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-4)',
                      padding: 'var(--space-4)',
                      background: habit.completed ? 'var(--success-50)' : 'var(--neutral-50)',
                      borderRadius: 'var(--radius-lg)',
                      border: habit.completed 
                        ? '1px solid var(--success-200)' 
                        : '1px solid var(--neutral-200)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <button
                      onClick={() => toggleHabit(habit.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        color: habit.completed ? 'var(--success-500)' : 'var(--neutral-400)',
                      }}
                    >
                      {habit.completed ? (
                        <CheckCircle2 size={24} />
                      ) : (
                        <Circle size={24} />
                      )}
                    </button>

                    <div 
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: 'var(--radius-lg)',
                        background: category?.color || 'var(--neutral-400)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon size={20} color="white" />
                    </div>

                    <div style={{ flex: 1 }}>
                      <h4 style={{
                        fontSize: 'var(--font-size-base)',
                        fontWeight: '600',
                        margin: '0 0 var(--space-1) 0',
                        color: habit.completed ? 'var(--success-700)' : 'var(--neutral-800)',
                        textDecoration: habit.completed ? 'line-through' : 'none',
                      }}>
                        {habit.name}
                      </h4>
                      <p style={{
                        fontSize: 'var(--font-size-sm)',
                        color: 'var(--neutral-600)',
                        margin: 0,
                      }}>
                        {habit.description}
                      </p>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-1)',
                        marginBottom: 'var(--space-1)',
                      }}>
                        <Flame size={16} color="var(--warning-500)" />
                        <span style={{
                          fontSize: 'var(--font-size-sm)',
                          fontWeight: '600',
                          color: 'var(--warning-600)',
                        }}>
                          {habit.streak}
                        </span>
                      </div>
                      <p style={{
                        fontSize: 'var(--font-size-xs)',
                        color: 'var(--neutral-500)',
                        margin: 0,
                        textTransform: 'capitalize',
                      }}>
                        {category?.name || 'General'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--neutral-500)' }}>
              <Target size={48} style={{ margin: '0 auto var(--space-4) auto', opacity: 0.5 }} />
              <p>No habits yet. Add your first habit to get started!</p>
            </div>
          )}
        </div>

        {/* Suggested Habits */}
        <div className="card">
          <h3 style={{ marginBottom: 'var(--space-6)' }}>Suggested Habits</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {suggestedHabits
              .filter(suggested => !habits.some(habit => habit.name === suggested.name))
              .slice(0, 6)
              .map((habit, index) => {
                const category = habitCategories.find(c => c.id === habit.category);
                const Icon = category?.icon || Target;
                
                return (
                  <div 
                    key={index}
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
                    <div 
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: 'var(--radius-md)',
                        background: category?.color || 'var(--neutral-400)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon size={16} color="white" />
                    </div>

                    <div style={{ flex: 1 }}>
                      <h4 style={{
                        fontSize: 'var(--font-size-sm)',
                        fontWeight: '600',
                        margin: '0 0 var(--space-1) 0',
                      }}>
                        {habit.name}
                      </h4>
                      <p style={{
                        fontSize: 'var(--font-size-xs)',
                        color: 'var(--neutral-600)',
                        margin: 0,
                      }}>
                        {habit.description}
                      </p>
                    </div>

                    <button
                      onClick={() => addSuggestedHabit(habit)}
                      className="btn btn-sm btn-secondary"
                    >
                      <Plus size={14} />
                      Add
                    </button>
                  </div>
                );
              })}
          </div>

          {suggestedHabits.filter(suggested => !habits.some(habit => habit.name === suggested.name)).length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--neutral-500)', fontStyle: 'italic' }}>
              You've added all our suggested habits! Great job building your routine.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}