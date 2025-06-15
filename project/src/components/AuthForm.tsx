import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Brain, Mail, Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function AuthForm() {
  const { state, login, register, clearError } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        return;
      }
      if (formData.name.trim().length < 2) {
        return;
      }
    }

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.email, formData.password, formData.name);
      }
    } catch (error) {
      // Error is handled by the auth context
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, var(--primary-100) 0%, var(--secondary-100) 100%)',
      padding: 'var(--space-6)',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        background: 'white',
        borderRadius: 'var(--radius-2xl)',
        padding: 'var(--space-8)',
        boxShadow: 'var(--shadow-2xl)',
        border: '1px solid var(--neutral-200)',
      }}>
        {/* Logo */}
        <div style={{
          textAlign: 'center',
          marginBottom: 'var(--space-8)',
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'var(--gradient-primary)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto var(--space-4) auto',
          }}>
            <Brain size={40} color="white" />
          </div>
          <h1 style={{
            fontSize: 'var(--font-size-3xl)',
            fontWeight: '700',
            background: 'var(--gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: '0 0 var(--space-2) 0',
          }}>
            MindMate
          </h1>
          <p style={{
            color: 'var(--neutral-600)',
            fontSize: 'var(--font-size-base)',
            margin: 0,
          }}>
            Your AI-powered wellness companion
          </p>
        </div>

        {/* Error Message */}
        {state.error && (
          <div style={{
            background: 'var(--error-50)',
            border: '1px solid var(--error-200)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-4)',
            marginBottom: 'var(--space-6)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
          }}>
            <AlertCircle size={20} color="var(--error-500)" />
            <span style={{ color: 'var(--error-700)', fontSize: 'var(--font-size-sm)' }}>
              {state.error}
            </span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <label style={{
                display: 'block',
                fontSize: 'var(--font-size-sm)',
                fontWeight: '600',
                color: 'var(--neutral-700)',
                marginBottom: 'var(--space-2)',
              }}>
                Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <User 
                  size={20} 
                  color="var(--neutral-400)"
                  style={{
                    position: 'absolute',
                    left: 'var(--space-3)',
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="input"
                  style={{ paddingLeft: 'var(--space-12)' }}
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div style={{ marginBottom: 'var(--space-4)' }}>
            <label style={{
              display: 'block',
              fontSize: 'var(--font-size-sm)',
              fontWeight: '600',
              color: 'var(--neutral-700)',
              marginBottom: 'var(--space-2)',
            }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail 
                size={20} 
                color="var(--neutral-400)"
                style={{
                  position: 'absolute',
                  left: 'var(--space-3)',
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="input"
                style={{ paddingLeft: 'var(--space-12)' }}
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: !isLogin ? 'var(--space-4)' : 'var(--space-6)' }}>
            <label style={{
              display: 'block',
              fontSize: 'var(--font-size-sm)',
              fontWeight: '600',
              color: 'var(--neutral-700)',
              marginBottom: 'var(--space-2)',
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock 
                size={20} 
                color="var(--neutral-400)"
                style={{
                  position: 'absolute',
                  left: 'var(--space-3)',
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="input"
                style={{ paddingLeft: 'var(--space-12)', paddingRight: 'var(--space-12)' }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: 'var(--space-3)',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--neutral-400)',
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <label style={{
                display: 'block',
                fontSize: 'var(--font-size-sm)',
                fontWeight: '600',
                color: 'var(--neutral-700)',
                marginBottom: 'var(--space-2)',
              }}>
                Confirm Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock 
                  size={20} 
                  color="var(--neutral-400)"
                  style={{
                    position: 'absolute',
                    left: 'var(--space-3)',
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className="input"
                  style={{ paddingLeft: 'var(--space-12)' }}
                  required={!isLogin}
                />
              </div>
              {formData.password !== formData.confirmPassword && formData.confirmPassword && (
                <p style={{
                  color: 'var(--error-600)',
                  fontSize: 'var(--font-size-xs)',
                  marginTop: 'var(--space-1)',
                }}>
                  Passwords do not match
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={state.isLoading}
            className="btn btn-primary"
            style={{
              width: '100%',
              marginBottom: 'var(--space-6)',
              opacity: state.isLoading ? 0.7 : 1,
            }}
          >
            {state.isLoading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        {/* Toggle Form */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--neutral-600)', fontSize: 'var(--font-size-sm)' }}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            {' '}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                clearError();
                setFormData({ email: '', password: '', name: '', confirmPassword: '' });
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary-600)',
                fontWeight: '600',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        {/* Demo Account Info */}
        <div style={{
          marginTop: 'var(--space-6)',
          padding: 'var(--space-4)',
          background: 'var(--primary-50)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--primary-200)',
        }}>
          <p style={{
            fontSize: 'var(--font-size-xs)',
            color: 'var(--primary-700)',
            margin: '0 0 var(--space-2) 0',
            fontWeight: '600',
          }}>
            Demo Account:
          </p>
          <p style={{
            fontSize: 'var(--font-size-xs)',
            color: 'var(--primary-600)',
            margin: 0,
          }}>
            Email: demo@mindmate.com<br />
            Password: demo123
          </p>
        </div>
      </div>
    </div>
  );
}