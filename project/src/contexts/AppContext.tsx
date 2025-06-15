import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface MoodEntry {
  id: string;
  mood: string;
  intensity: number;
  notes: string;
  timestamp: Date;
}

interface Habit {
  id: string;
  name: string;
  description: string;
  category: string;
  streak: number;
  completed: boolean;
  lastCompleted?: Date;
}

interface AppState {
  moods: MoodEntry[];
  habits: Habit[];
  chatHistory: any[];
  isLoading: boolean;
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<any>;
  addMoodEntry: (mood: string, intensity: number, notes: string) => void;
  addHabit: (habit: Omit<Habit, 'id' | 'streak' | 'completed'>) => void;
  toggleHabit: (habitId: string) => void;
  addChatMessage: (message: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialState: AppState = {
  moods: [],
  habits: [],
  chatHistory: [],
  isLoading: false,
};

function appReducer(state: AppState, action: any): AppState {
  switch (action.type) {
    case 'LOAD_USER_DATA':
      return {
        ...state,
        ...action.payload,
      };
    case 'ADD_MOOD':
      return {
        ...state,
        moods: [action.payload, ...state.moods],
      };
    case 'ADD_HABIT':
      return {
        ...state,
        habits: [...state.habits, action.payload],
      };
    case 'TOGGLE_HABIT':
      return {
        ...state,
        habits: state.habits.map(habit =>
          habit.id === action.payload
            ? {
                ...habit,
                completed: !habit.completed,
                streak: !habit.completed ? habit.streak + 1 : habit.streak,
                lastCompleted: !habit.completed ? new Date() : habit.lastCompleted,
              }
            : habit
        ),
      };
    case 'ADD_CHAT_MESSAGE':
      return {
        ...state,
        chatHistory: [...state.chatHistory, action.payload],
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'RESET_DATA':
      return initialState;
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { state: authState } = useAuth();

  // Load user-specific data when user logs in
  useEffect(() => {
    if (authState.user) {
      const savedData = localStorage.getItem(`mindmate_data_${authState.user.id}`);
      if (savedData) {
        try {
          const userData = JSON.parse(savedData);
          // Convert date strings back to Date objects
          const processedData = {
            ...userData,
            moods: userData.moods?.map((mood: any) => ({
              ...mood,
              timestamp: new Date(mood.timestamp),
            })) || [],
            habits: userData.habits?.map((habit: any) => ({
              ...habit,
              lastCompleted: habit.lastCompleted ? new Date(habit.lastCompleted) : undefined,
            })) || [],
          };
          dispatch({ type: 'LOAD_USER_DATA', payload: processedData });
        } catch (error) {
          console.error('Error loading user data:', error);
        }
      }
    } else {
      dispatch({ type: 'RESET_DATA' });
    }
  }, [authState.user]);

  // Save user data whenever state changes
  useEffect(() => {
    if (authState.user && (state.moods.length > 0 || state.habits.length > 0 || state.chatHistory.length > 0)) {
      localStorage.setItem(`mindmate_data_${authState.user.id}`, JSON.stringify(state));
    }
  }, [state, authState.user]);

  const addMoodEntry = (mood: string, intensity: number, notes: string) => {
    const entry: MoodEntry = {
      id: Date.now().toString(),
      mood,
      intensity,
      notes,
      timestamp: new Date(),
    };
    dispatch({ type: 'ADD_MOOD', payload: entry });
  };

  const addHabit = (habitData: Omit<Habit, 'id' | 'streak' | 'completed'>) => {
    const habit: Habit = {
      ...habitData,
      id: Date.now().toString(),
      streak: 0,
      completed: false,
    };
    dispatch({ type: 'ADD_HABIT', payload: habit });
  };

  const toggleHabit = (habitId: string) => {
    dispatch({ type: 'TOGGLE_HABIT', payload: habitId });
  };

  const addChatMessage = (message: any) => {
    dispatch({ type: 'ADD_CHAT_MESSAGE', payload: message });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        addMoodEntry,
        addHabit,
        toggleHabit,
        addChatMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}