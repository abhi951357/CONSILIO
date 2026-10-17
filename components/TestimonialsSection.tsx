import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Testimonial } from '@/types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section style={{ padding: '90px 0', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div style={{ maxWidth: 760, margin: '0 auto 60px', textAlign: 'center' }}>
          <div className="pill-badge" style={{ marginBottom: 16 }}>
            <span className="pill-dot"></span>
            Client Proof
          </div>
          <h2 className="heading-1" style={{ marginBottom: 16 }}>
            Trusted by Forward-Thinking Enterprise Leaders
          </h2>
          <p className="text-secondary" style={{ fontSize: '1.05rem' }}>
            Hear how our strategic interventions, operational frameworks, and financial advisory transformed organizations worldwide.
          </p>
        </div>

        <div className="grid-2" style={{ gap: 24 }}>
          {testimonials.map((t) => (
            <div key={t.id} className="card-editorial" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div style={{ display: 'flex', gap: 2, color: '#f59e0b' }}>
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} size={15} fill="#f59e0b" />
                    ))}
                  </div>
                  <Quote size={24} color="var(--accent-teal)" style={{ opacity: 0.6 }} />
                </div>

                <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: '#ffffff', marginBottom: 24, fontStyle: 'italic' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 14, borderTop: '1px solid var(--border-subtle)', paddingTop: 18 }}>
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(20, 243, 193, 0.2), rgba(7, 82, 255, 0.2))',
                    border: '1px solid var(--accent-teal)',
                    color: '#ffffff',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.95rem',
                  }}
                >
                  {t.clientName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', marginBottom: 2 }}>
                    {t.clientName}
                  </h4>
                  <p className="text-muted" style={{ fontSize: '0.8rem' }}>
                    {t.clientRole}, <span style={{ color: 'var(--text-secondary)' }}>{t.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
