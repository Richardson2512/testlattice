import React from 'react';
import Link from 'next/link';

interface SignupPromptModalProps {
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
}

export function SignupPromptModal({ isOpen, onClose, title }: SignupPromptModalProps) {
  if (!isOpen) return null;

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
        <div style={{ 
          fontSize: '48px', 
          marginBottom: '24px',
          background: 'var(--beige-100)',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px auto'
        }}>
          {title === 'Test Failed' ? '❌' : '✨'}
        </div>
        
        <h2 style={{ 
          margin: '0 0 12px 0', 
          fontSize: '24px', 
          fontWeight: '700',
          color: 'var(--text-primary)'
        }}>
          {title || 'Test Complete!'}
        </h2>
        
        <p style={{ 
          margin: '0 0 24px 0', 
          color: 'var(--text-secondary)',
          lineHeight: '1.6',
          fontSize: '16px'
        }}>
          We've analyzed your site against our <strong>10-Point Visual Inspection</strong> checklist.
        </p>

        {/* Mini Report Preview */}
        <div style={{
          background: 'var(--bg-secondary)',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px',
          textAlign: 'left'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
               <span>✅</span> Load Performance
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
               <span>✅</span> Mobile Responsiveness
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
               <span>🔎</span> Visual Regression
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
               <span>⚠️</span> Console Errors
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
               <span>🔒</span> Security Headers
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
               <span>...</span> +5 More Checks
            </div>
          </div>
        </div>

        <p style={{ 
            fontSize: '14px',
            color: 'var(--text-muted)',
            marginBottom: '24px'
        }}>
            Sign up to view your full <strong>Visual Inspection Report</strong> for free.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Link href="/signup" style={{
            display: 'block',
            width: '100%',
            padding: '14px',
            backgroundColor: 'var(--maroon-800)',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '16px',
            transition: 'background-color 0.2s',
          }}>
            Create Free Account
          </Link>
          
          <Link href="/login" style={{
            display: 'block',
            width: '100%',
            padding: '14px',
            backgroundColor: 'transparent',
            color: 'var(--text-primary)',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '16px',
            border: '1px solid var(--border-light)',
          }}>
            Log in to existing account
          </Link>
        </div>

        <div style={{ marginTop: '24px', fontSize: '12px', color: 'var(--text-muted)' }}>
          Identify 5x more bugs with a Rihario account
        </div>
      </div>
    </div>
  );
}
