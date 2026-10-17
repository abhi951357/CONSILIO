import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, TrendingUp, Quote } from 'lucide-react';
import { CaseStudy } from '@/types';

interface CaseStudiesSectionProps {
  caseStudies: CaseStudy[];
  title?: string;
  subtitle?: string;
  limit?: number;
}

export function CaseStudiesSection({
  caseStudies,
  title = 'Real Results From Strategic Partnerships',
  subtitle = 'Explore business transformations driven by practical strategy, collaboration & measurable commercial results.',
  limit,
}: CaseStudiesSectionProps) {
  const displayStudies = limit ? caseStudies.slice(0, limit) : caseStudies;

  return (
    <section style={{ padding: '90px 0', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 20,
            marginBottom: 50,
          }}
        >
          <div style={{ maxWidth: 680 }}>
            <div className="pill-badge" style={{ marginBottom: 16 }}>
              <span className="pill-dot"></span>
              Success Stories
            </div>
            <h2 className="heading-1" style={{ marginBottom: 12 }}>
              {title}
            </h2>
            <p className="text-secondary" style={{ fontSize: '1.05rem' }}>
              {subtitle}
            </p>
          </div>

          <Link href="/case-studies" className="btn btn-outline">
            View All Case Studies
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid-2" style={{ gap: 28 }}>
          {displayStudies.map((study) => (
            <Link
              key={study.id}
              href={`/case-studies/${study.slug}`}
              className="card-editorial"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '36px',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--accent-teal)',
                    }}
                  >
                    {study.industry} • {study.serviceCategory}
                  </span>
                  <span className="text-muted" style={{ fontSize: '0.85rem' }}>
                    {study.location}
                  </span>
                </div>

                <h3 className="heading-2" style={{ fontSize: '1.5rem', marginBottom: 16, color: '#ffffff', lineHeight: 1.3 }}>
                  {study.title}
                </h3>

                <p className="text-secondary" style={{ fontSize: '0.95rem', marginBottom: 28, lineHeight: 1.6 }}>
                  {study.summary}
                </p>

                {/* Key Metrics row */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 16,
                    padding: '16px 20px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: 24,
                  }}
                >
                  {study.metrics?.map((m, mIdx) => (
                    <div key={mIdx} style={{ flex: '1 1 90px' }}>
                      <span
                        style={{
                          fontSize: '1.6rem',
                          fontWeight: 800,
                          color: mIdx === 0 ? 'var(--accent-teal)' : '#ffffff',
                          fontFamily: 'var(--font-mono)',
                          display: 'block',
                          lineHeight: 1.1,
                        }}
                      >
                        {m.value}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Quote excerpt & CTA */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 20 }}>
                <p style={{ fontStyle: 'italic', fontSize: '0.885rem', color: 'var(--text-secondary)', marginBottom: 12 }}>
                  &ldquo;{study.clientQuote}&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.825rem', fontWeight: 600, color: '#ffffff' }}>
                    — {study.clientAuthor}, {study.clientRole}
                  </span>
                  <span style={{ color: 'var(--accent-teal)', display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.85rem', fontWeight: 600 }}>
                    Read Full Story <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
