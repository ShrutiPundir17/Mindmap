import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Home, 
  MessageCircle, 
  Heart, 
  Target, 
  Users, 
  AlertTriangle, 
  User,
  Brain,
  LogOut
} from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: '/', icon: Home, label: 'Dashboard' },
  { path: '/chat', icon: MessageCircle, label: 'AI Chat' },
  { path: '/mood', icon: Heart, label: 'Mood Tracker' },
  { path: '/habits', icon: Target, label: 'Habits' },
  { path: '/support', icon: Users, label: 'Support' },
  { path: '/emergency', icon: AlertTriangle, label: 'Emergency' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { state: authState, logout } = useAuth();

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <nav style={{
        width: '280px',
        background: 'white',
        borderRight: '1px solid var(--neutral-200)',
        padding: 'var(--space-6)',
        boxShadow: 'var(--shadow-lg)',
        position: 'fixed',
        height: '100vh',
        overflowY: 'auto',
      }}>
        {/* Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          marginBottom: 'var(--space-8)',
          padding: 'var(--space-4)',
          background: 'var(--gradient-primary)',
          borderRadius: 'var(--radius-xl)',
          color: 'white',
        }}>
          <Brain size={32} />
          <div>
            <h1 style={{ 
              fontSize: 'var(--font-size-xl)', 
              fontWeight: '700',
              margin: 0,
              lineHeight: 1,
            }}>
              MindMate
            </h1>
            <p style={{ 
              fontSize: 'var(--font-size-sm)', 
              opacity: 0.9,
              margin: 0,
            }}>
              Your Wellness Companion
            </p>
          </div>
        </div>

        {/* User Info */}
        {authState.user && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
            marginBottom: 'var(--space-6)',
            padding: 'var(--space-3)',
            background: 'var(--neutral-50)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--neutral-200)',
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'var(--gradient-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
            }}>
              {authState.user.avatar}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ 
                fontSize: 'var(--font-size-sm)', 
                fontWeight: '600',
                margin: 0,
                color: 'var(--neutral-800)',
              }}>
                {authState.user.name}
              </p>
              <p style={{ 
                fontSize: 'var(--font-size-xs)', 
                color: 'var(--neutral-500)',
                margin: 0,
              }}>
                {authState.user.email}
              </p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path} style={{ marginBottom: 'var(--space-2)' }}>
                <Link
                  to={item.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-3)',
                    padding: 'var(--space-3) var(--space-4)',
                    borderRadius: 'var(--radius-lg)',
                    textDecoration: 'none',
                    color: isActive ? 'var(--primary-600)' : 'var(--neutral-600)',
                    background: isActive ? 'var(--primary-50)' : 'transparent',
                    border: isActive ? '1px solid var(--primary-200)' : '1px solid transparent',
                    fontWeight: isActive ? '600' : '500',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'var(--neutral-50)';
                      e.currentTarget.style.borderColor = 'var(--neutral-200)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.borderColor = 'transparent';
                    }
                  }}
                >
                  <Icon size={20} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Logout Button */}
        <div style={{ marginTop: 'var(--space-8)' }}>
          <button
            onClick={logout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              padding: 'var(--space-3) var(--space-4)',
              borderRadius: 'var(--radius-lg)',
              background: 'none',
              border: '1px solid var(--neutral-200)',
              color: 'var(--neutral-600)',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              width: '100%',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--error-50)';
              e.currentTarget.style.borderColor = 'var(--error-200)';
              e.currentTarget.style.color = 'var(--error-600)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none';
              e.currentTarget.style.borderColor = 'var(--neutral-200)';
              e.currentTarget.style.color = 'var(--neutral-600)';
            }}
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>

        {/* Emergency Button */}
        <div style={{
          marginTop: 'var(--space-6)',
          padding: 'var(--space-4)',
          background: 'var(--error-50)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--error-200)',
        }}>
          <h4 style={{ 
            color: 'var(--error-700)',
            fontSize: 'var(--font-size-sm)',
            fontWeight: '600',
            margin: '0 0 var(--space-2) 0',
          }}>
            Need Help?
          </h4>
          <p style={{ 
            fontSize: 'var(--font-size-xs)',
            color: 'var(--error-600)',
            margin: '0 0 var(--space-3) 0',
          }}>
            Crisis support is available 24/7
          </p>
          <Link 
            to="/emergency" 
            className="btn btn-sm"
            style={{
              background: 'var(--error-500)',
              color: 'white',
              width: '100%',
              fontSize: 'var(--font-size-xs)',
            }}
          >
            <AlertTriangle size={16} />
            Get Support
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{
        flex: 1,
        marginLeft: '280px',
        padding: 'var(--space-8)',
        minHeight: '100vh',
      }}>
        {children}
      </main>
    </div>
  );
}