'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { Service } from '@/types';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  services?: Service[];
  defaultService?: string;
}

export function ConsultationModal({ isOpen, onClose, services = [], defaultService = '' }: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    serviceNeeded: defaultService,
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const resetAndClose = React.useCallback(() => {
    setIsSuccess(false);
    setErrorMsg('');
    onClose();
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'consultation_modal',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit request');
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        resetAndClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, resetAndClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={resetAndClose}
      style={{
        padding: '12px',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '680px',
          width: '100%',
          maxHeight: '94vh',
          padding: '24px 28px',
          borderRadius: '16px',
          background: 'linear-gradient(145deg, #161922 0%, #0f1117 100%)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.75), 0 0 35px rgba(20, 243, 193, 0.08)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            padding: 6,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            zIndex: 10,
          }}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {isSuccess ? (
          <div style={{ textAlign: 'center', padding: '20px 8px' }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: 'rgba(20, 243, 193, 0.12)',
                color: 'var(--accent-teal)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 14px',
                border: '1px solid rgba(20, 243, 193, 0.3)',
              }}
            >
              <CheckCircle2 size={28} />
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', marginBottom: 8 }}>
              Consultation Scheduled
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 20, fontSize: '0.9rem', maxWidth: 440, margin: '0 auto 20px' }}>
              Thank you, {formData.name}. One of our senior executive partners will review your objectives and contact you within 24 hours.
            </p>
            <button className="btn btn-primary btn-sm" onClick={resetAndClose} style={{ padding: '8px 24px' }}>
              Done
            </button>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div style={{ marginBottom: 14, paddingRight: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span className="pill-dot"></span>
                <span
                  style={{
                    fontSize: '0.72rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--accent-teal)',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  Executive Advisory
                </span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', margin: '0 0 2px', lineHeight: 1.25 }}>
                Book an Executive Consultation
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.825rem', margin: 0, lineHeight: 1.4 }}>
                Partner with seasoned consultants committed to measurable business performance and strategic growth.
              </p>
            </div>

            {errorMsg && (
              <div
                style={{
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#f87171',
                  marginBottom: 10,
                  fontSize: '0.8rem',
                }}
              >
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {/* Row 1: Name and Email */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Full Name *</label>
                  <input
                    type="text"
                    required
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#ffffff',
                      fontSize: '0.875rem',
                      outline: 'none',
                    }}
                    placeholder="e.g. Olivia Brooks"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Work Email *</label>
                  <input
                    type="email"
                    required
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#ffffff',
                      fontSize: '0.875rem',
                      outline: 'none',
                    }}
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              {/* Row 2: Company and Phone */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Company Name</label>
                  <input
                    type="text"
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#ffffff',
                      fontSize: '0.875rem',
                      outline: 'none',
                    }}
                    placeholder="e.g. Vertex Technologies"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Phone Number</label>
                  <input
                    type="tel"
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#ffffff',
                      fontSize: '0.875rem',
                      outline: 'none',
                    }}
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              {/* Row 3: Service Selection & Challenge Description */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Primary Advisory Pillar</label>
                  <select
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      background: '#161922',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#ffffff',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                    value={formData.serviceNeeded}
                    onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                  >
                    <option value="">Select an Advisory Pillar...</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.slug}>
                        {s.title} ({s.category})
                      </option>
                    ))}
                    <option value="enterprise-turnaround">Comprehensive Business Strategy</option>
                    <option value="other">Other Strategic Advisory</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Brief Business Challenge *</label>
                  <textarea
                    required
                    rows={2}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#ffffff',
                      fontSize: '0.85rem',
                      outline: 'none',
                      resize: 'none',
                      fontFamily: 'inherit',
                    }}
                    placeholder="Briefly state your organization's goals or bottlenecks..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
              </div>

              {/* Footer Row: Note & Submit Button */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 12,
                  marginTop: 6,
                  paddingTop: 10,
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <span
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <Sparkles size={13} color="var(--accent-teal)" />
                  Handled under strict enterprise NDA & discretion
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-teal"
                  style={{
                    padding: '8px 20px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Confirm Request
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
