'use client';

import React, { useState } from 'react';
import { ChevronDown, Plus, Minus, HelpCircle } from 'lucide-react';
import { FAQItem } from '@/types';

interface FaqSectionProps {
  faqs: FAQItem[];
}

export function FaqSection({ faqs }: FaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section style={{ padding: '90px 0', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container-narrow">
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <div className="pill-badge" style={{ marginBottom: 16 }}>
            <span className="pill-dot"></span>
            FAQs
          </div>
          <h2 className="heading-1" style={{ marginBottom: 12 }}>
            Your Commonly Asked Questions
          </h2>
          <p className="text-secondary" style={{ fontSize: '1rem' }}>
            Everything you need to know about partnering with Consilio, our consulting framework, and deliverables.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                style={{
                  background: 'var(--bg-card)',
                  border: `1px solid ${isOpen ? 'var(--border-medium)' : 'var(--border-subtle)'}`,
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  transition: 'var(--transition)',
                }}
              >
                <button
                  onClick={() => toggle(faq.id)}
                  style={{
                    width: '100%',
                    padding: '22px 28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    textAlign: 'left',
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: '1.05rem',
                    gap: 16,
                  }}
                >
                  <span>{faq.question}</span>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: isOpen ? 'var(--accent-teal)' : 'rgba(255, 255, 255, 0.05)',
                      color: isOpen ? '#0c0e12' : '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'var(--transition)',
                    }}
                  >
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '0 28px 24px',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.7,
                      fontSize: '0.975rem',
                      borderTop: '1px solid rgba(255, 255, 255, 0.04)',
                      paddingTop: 16,
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
