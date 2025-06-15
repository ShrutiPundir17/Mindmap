import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Phone, 
  MessageCircle, 
  Heart, 
  Shield,
  ExternalLink,
  Clock,
  MapPin,
  User
} from 'lucide-react';

interface EmergencyContact {
  name: string;
  phone: string;
  description: string;
  availability: string;
  country: string;
}

const emergencyContacts: EmergencyContact[] = [
  {
    name: 'National Suicide Prevention Lifeline',
    phone: '988',
    description: 'Free and confidential emotional support 24/7',
    availability: '24/7',
    country: 'US',
  },
  {
    name: 'Crisis Text Line',
    phone: 'Text HOME to 741741',
    description: 'Free, 24/7 crisis support via text message',
    availability: '24/7',
    country: 'US',
  },
  {
    name: 'SAMHSA National Helpline',
    phone: '1-800-662-4357',
    description: 'Treatment referral and information service',
    availability: '24/7',
    country: 'US',
  },
  {
    name: 'International Association for Suicide Prevention',
    phone: 'Visit website for local numbers',
    description: 'Global directory of crisis centers',
    availability: 'Varies',
    country: 'International',
  },
];

const crissSigns = [
  'Persistent thoughts of death or suicide',
  'Feeling trapped or hopeless',
  'Extreme mood swings',
  'Withdrawing from friends and activities',
  'Increasing use of alcohol or drugs',
  'Giving away personal belongings',
  'Saying goodbye to loved ones',
  'Expressing feelings of being a burden',
];

const copingStrategies = [
  {
    title: 'Breathing Exercise',
    description: 'Take slow, deep breaths. Inhale for 4 counts, hold for 4, exhale for 6.',
    icon: Heart,
  },
  {
    title: 'Grounding Technique',
    description: 'Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste.',
    icon: Shield,
  },
  {
    title: 'Reach Out',
    description: 'Contact a trusted friend, family member, or counselor. You don\'t have to face this alone.',
    icon: User,
  },
  {
    title: 'Remove Means',
    description: 'If you\'re having thoughts of self-harm, remove or secure any means nearby.',
    icon: AlertTriangle,
  },
];

export default function Emergency() {
  const [selectedContact, setSelectedContact] = useState<EmergencyContact | null>(null);
  const [showCoping, setShowCoping] = useState(false);

  return (
    <div className="animate-fade-in">
      {/* Critical Alert Banner */}
      <div style={{
        background: 'var(--error-500)',
        color: 'white',
        padding: 'var(--space-6)',
        borderRadius: 'var(--radius-xl)',
        marginBottom: 'var(--space-8)',
        textAlign: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
          <AlertTriangle size={32} />
          <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: '700', margin: 0 }}>
            Crisis Support
          </h1>
        </div>
        <p style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-4)' }}>
          If you're having thoughts of suicide or self-harm, please reach out for help immediately.
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a 
            href="tel:988" 
            className="btn"
            style={{
              background: 'white',
              color: 'var(--error-600)',
              fontSize: 'var(--font-size-lg)',
              fontWeight: '700',
            }}
          >
            <Phone size={20} />
            Call 988 Now
          </a>
          <button 
            onClick={() => setShowCoping(!showCoping)}
            className="btn"
            style={{
              background: 'transparent',
              color: 'white',
              border: '2px solid white',
            }}
          >
            <Heart size={20} />
            Immediate Coping Help
          </button>
        </div>
      </div>

      {/* Immediate Coping Strategies */}
      {showCoping && (
        <div className="card" style={{ 
          marginBottom: 'var(--space-8)',
          background: 'var(--success-50)',
          border: '2px solid var(--success-200)',
        }}>
          <h2 style={{ marginBottom: 'var(--space-6)', color: 'var(--success-700)' }}>
            Immediate Coping Strategies
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {copingStrategies.map((strategy, index) => {
              const Icon = strategy.icon;
              return (
                <div 
                  key={index}
                  style={{
                    display: 'flex',
                    gap: 'var(--space-4)',
                    padding: 'var(--space-4)',
                    background: 'white',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--success-300)',
                  }}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'var(--success-500)',
                    display: 'flex',
                    align: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={24} color="white" />
                  </div>
                  <div>
                    <h4 style={{ 
                      fontSize: 'var(--font-size-lg)',
                      fontWeight: '600',
                      margin: '0 0 var(--space-2) 0',
                      color: 'var(--success-700)',
                    }}>
                      {strategy.title}
                    </h4>
                    <p style={{ 
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--neutral-700)',
                      margin: 0,
                      lineHeight: 1.5,
                    }}>
                      {strategy.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-8">
        {/* Emergency Contacts */}
        <div className="card">
          <h2 style={{ marginBottom: 'var(--space-6)' }}>Emergency Contacts</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {emergencyContacts.map((contact, index) => (
              <div 
                key={index}
                onClick={() => setSelectedContact(contact)}
                style={{
                  padding: 'var(--space-4)',
                  background: selectedContact === contact ? 'var(--primary-50)' : 'var(--neutral-50)',
                  borderRadius: 'var(--radius-lg)',
                  border: selectedContact === contact 
                    ? '2px solid var(--primary-300)' 
                    : '1px solid var(--neutral-200)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
                  <Phone size={20} color="var(--primary-600)" />
                  <h4 style={{ 
                    fontSize: 'var(--font-size-base)',
                    fontWeight: '600',
                    margin: 0,
                    flex: 1,
                  }}>
                    {contact.name}
                  </h4>
                  <span style={{
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--success-600)',
                    background: 'var(--success-100)',
                    padding: 'var(--space-1) var(--space-2)',
                    borderRadius: 'var(--radius-md)',
                  }}>
                    {contact.country}
                  </span>
                </div>
                
                <p style={{
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--neutral-600)',
                  margin: '0 0 var(--space-3) 0',
                }}>
                  {contact.description}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: '700',
                    color: 'var(--primary-600)',
                  }}>
                    {contact.phone}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
                    <Clock size={14} color="var(--neutral-500)" />
                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--neutral-500)' }}>
                      {contact.availability}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 'var(--space-6)',
            padding: 'var(--space-4)',
            background: 'var(--warning-50)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--warning-200)',
          }}>
            <h4 style={{ 
              color: 'var(--warning-700)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: '600',
              margin: '0 0 var(--space-2) 0',
            }}>
              International Users
            </h4>
            <p style={{ 
              fontSize: 'var(--font-size-xs)',
              color: 'var(--warning-600)',
              margin: 0,
            }}>
              For crisis support outside the US, visit{' '}
              <a 
                href="https://www.iasp.info/resources/Crisis_Centres/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: 'var(--warning-700)', textDecoration: 'underline' }}
              >
                IASP Crisis Centers Directory
              </a>
            </p>
          </div>
        </div>

        {/* Warning Signs & Resources */}
        <div>
          {/* Warning Signs */}
          <div className="card" style={{ marginBottom: 'var(--space-6)' }}>
            <h3 style={{ marginBottom: 'var(--space-4)', color: 'var(--error-600)' }}>
              Crisis Warning Signs
            </h3>
            <p style={{ 
              fontSize: 'var(--font-size-sm)',
              color: 'var(--neutral-600)',
              marginBottom: 'var(--space-4)',
            }}>
              If you or someone you know is experiencing these signs, seek help immediately:
            </p>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-2)',
            }}>
              {crissSigns.map((sign, index) => (
                <li 
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 'var(--space-2)',
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--neutral-700)',
                  }}
                >
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--error-500)',
                    marginTop: '8px',
                    flexShrink: 0,
                  }} />
                  {sign}
                </li>
              ))}
            </ul>
          </div>

          {/* Additional Resources */}
          <div className="card">
            <h3 style={{ marginBottom: 'var(--space-4)' }}>Additional Resources</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <a
                href="https://www.mentalhealth.gov"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  padding: 'var(--space-3)',
                  background: 'var(--neutral-50)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--neutral-200)',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--primary-50)';
                  e.currentTarget.style.borderColor = 'var(--primary-200)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--neutral-50)';
                  e.currentTarget.style.borderColor = 'var(--neutral-200)';
                }}
              >
                <ExternalLink size={20} color="var(--primary-600)" />
                <div>
                  <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: '600', margin: 0 }}>
                    MentalHealth.gov
                  </h4>
                  <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--neutral-600)', margin: 0 }}>
                    Government mental health resources
                  </p>
                </div>
              </a>

              <a
                href="https://www.nami.org"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  padding: 'var(--space-3)',
                  background: 'var(--neutral-50)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--neutral-200)',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--primary-50)';
                  e.currentTarget.style.borderColor = 'var(--primary-200)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--neutral-50)';
                  e.currentTarget.style.borderColor = 'var(--neutral-200)';
                }}
              >
                <ExternalLink size={20} color="var(--primary-600)" />
                <div>
                  <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: '600', margin: 0 }}>
                    NAMI
                  </h4>
                  <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--neutral-600)', margin: 0 }}>
                    National Alliance on Mental Illness
                  </p>
                </div>
              </a>

              <a
                href="https://www.psychologytoday.com/us/therapists"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  padding: 'var(--space-3)',
                  background: 'var(--neutral-50)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--neutral-200)',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--primary-50)';
                  e.currentTarget.style.borderColor = 'var(--primary-200)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--neutral-50)';
                  e.currentTarget.style.borderColor = 'var(--neutral-200)';
                }}
              >
                <ExternalLink size={20} color="var(--primary-600)" />
                <div>
                  <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: '600', margin: 0 }}>
                    Find a Therapist
                  </h4>
                  <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--neutral-600)', margin: 0 }}>
                    Psychology Today directory
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Message */}
      <div style={{
        marginTop: 'var(--space-8)',
        padding: 'var(--space-6)',
        background: 'var(--primary-50)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--primary-200)',
        textAlign: 'center',
      }}>
        <Heart size={32} color="var(--primary-600)" style={{ margin: '0 auto var(--space-4) auto' }} />
        <h3 style={{ color: 'var(--primary-700)', marginBottom: 'var(--space-3)' }}>
          You Are Not Alone
        </h3>
        <p style={{ 
          fontSize: 'var(--font-size-lg)',
          color: 'var(--primary-600)',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: 1.6,
        }}>
          Your life has value and meaning. There are people who want to help you through this difficult time. 
          Reaching out for support is a sign of strength, not weakness.
        </p>
      </div>
    </div>
  );
}