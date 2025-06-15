import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import AuthForm from './components/AuthForm';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import MoodTracker from './pages/MoodTracker';
import HabitBuilder from './pages/HabitBuilder';
import SupportRooms from './pages/SupportRooms';
import Emergency from './pages/Emergency';
import Profile from './pages/Profile';

function AppContent() {
  const { state } = useAuth();

  if (state.isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, var(--primary-100) 0%, var(--secondary-100) 100%)',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '4px solid var(--primary-200)',
            borderTop: '4px solid var(--primary-500)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto var(--space-4) auto',
          }} />
          <p style={{ color: 'var(--neutral-600)' }}>Loading MindMate...</p>
        </div>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  if (!state.isAuthenticated) {
    return <AuthForm />;
  }

  return (
    <AppProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/mood" element={<MoodTracker />} />
          <Route path="/habits" element={<HabitBuilder />} />
          <Route path="/support" element={<SupportRooms />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </AppProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;