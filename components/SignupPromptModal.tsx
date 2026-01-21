import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface SignupPromptModalProps {
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  issuesFound?: number;
  testId?: string;
}

export function SignupPromptModal({ isOpen, onClose, title, issuesFound = 0, testId }: SignupPromptModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleSignup = () => {
    // Store testId in session storage so we can associate after signup
    if (testId) {
      sessionStorage.setItem('pending_guest_test', testId);
    }
    router.push('/signup');
  };

  const handleLogin = () => {
    if (testId) {
      sessionStorage.setItem('pending_guest_test', testId);
    }
    router.push('/login');
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      backdropFilter: 'blur(4px)',
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '32px',
        maxWidth: '480px',
        width: '90%',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        textAlign: 'center',
        position: 'relative'
      }}>
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'var(--beige-100)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              color: 'var(--text-muted)',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'var(--beige-200)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'var(--beige-100)'}
          >
            ✕
          </button>
        )}
        {/* Icon based on issues found */}
        <div style={{
          fontSize: '48px',
          marginBottom: '24px',
          background: issuesFound > 0 ? 'rgba(239, 68, 68, 0.1)' : 'var(--beige-100)',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px auto'
        }}>
          {issuesFound > 0 ? '🔴' : '✅'}
        </div>

        <h2 style={{
          margin: '0 0 12px 0',
          fontSize: '24px',
          fontWeight: '700',
          color: 'var(--text-primary)'
        }}>
          {issuesFound > 0
            ? `We Found ${issuesFound} Issue${issuesFound > 1 ? 's' : ''}!`
            : 'Test Complete!'}
        </h2>

        <p style={{
          margin: '0 0 24px 0',
          color: 'var(--text-secondary)',
          lineHeight: '1.6',
          fontSize: '16px'
        }}>
          {issuesFound > 0
            ? 'Your website has potential issues that could affect user experience. View the full report to see details.'
            : 'We\'ve analyzed your site and generated a comprehensive report.'}
        </p>

        {/* Issues Preview (if issues found) */}
        {issuesFound > 0 && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.05)',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '24px',
            border: '1px solid rgba(239, 68, 68, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
              <div style={{
                background: 'rgba(239, 68, 68, 0.15)',
                padding: '4px 12px',
                borderRadius: '999px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#ef4444'
              }}>
                🔴 {issuesFound} Issue{issuesFound > 1 ? 's' : ''} Found
              </div>
            </div>
            <p style={{
              margin: '12px 0 0 0',
              fontSize: '13px',
              color: 'var(--text-muted)'
            }}>
              Issues may include console errors, broken links, accessibility problems, and more.
            </p>
          </div>
        )}

        {/* Report Preview */}
        <div style={{
          background: 'var(--bg-secondary)',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px',
          textAlign: 'left'
        }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Your Report Includes:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
              <span>📊</span> Issue Summary
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
              <span>📱</span> Responsive Testing
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
              <span>🔍</span> Console Errors
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
              <span>⚡</span> Performance
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
              <span>🔗</span> Link Validation
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
              <span>📥</span> PDF Download
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button
            onClick={handleSignup}
            style={{
              display: 'block',
              width: '100%',
              padding: '14px',
              backgroundColor: issuesFound > 0 ? '#ef4444' : 'var(--maroon-800)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
          >
            📋 View Full Report
          </button>

          <button
            onClick={handleLogin}
            style={{
              display: 'block',
              width: '100%',
              padding: '14px',
              backgroundColor: 'transparent',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-light)',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            Already have an account? Log in
          </button>
        </div>

        <div style={{ marginTop: '24px', fontSize: '12px', color: 'var(--text-muted)' }}>
          Free account required to view detailed reports
        </div>
      </div>
    </div>
  );
}
