'use client';

import React, { useState } from 'react';
import { Search, Compass, Zap, ArrowRight } from 'lucide-react';

export function ApproachSection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '01',
      stepCount: 'Step 1 of 3',
      phase: 'Phase 1 · Diagnostic & Discovery',
      title: 'Discover & Diagnose',
      subtitle: 'Uncover bottlenecks & hidden growth ceilings',
      icon: Search,
      image: '/images/approach-discover-diagnose.jpg',
      desc: 'We conduct a comprehensive diagnostic audit of your business model, review operational workflows, analyze customer unit economics, and uncover highest-impact growth opportunities.',
      deliverables: [
        'Operational bottleneck mapping',
        'Financial sensitivity audit',
        'Competitive moat assessment',
        'Leadership bandwidth review',
      ],
      transitionHint: 'Feeds into Phase 2 Strategy →',
    },
    {
      number: '02',
      stepCount: 'Step 2 of 3',
      phase: 'Phase 2 · Strategic Architecture',
      title: 'Strategize & Architect',
      subtitle: 'Build actionable roadmaps with quantified ROI',
      icon: Compass,
      image: '/images/approach-strategize-architect.jpg',
      desc: 'Together with your C-suite and department leads, we architect a realistic strategic roadmap with phased milestones, capital requirements, and departmental execution targets.',
      deliverables: [
        '3-year strategic master blueprint',
        'Prioritized 90-day action cadences',
        'Resource & headcount allocation model',
        'Executive KPI dashboard',
      ],
      transitionHint: 'Executes through Phase 3 Operations →',
    },
    {
      number: '03',
      stepCount: 'Step 3 of 3',
      phase: 'Phase 3 · Execution & Scaling',
      title: 'Execute & Optimize',
      subtitle: 'Embed operational discipline & continuous Kaizen',
      icon: Zap,
      image: '/images/approach-execute-optimize.jpg',
      desc: 'We don’t just hand over a plan—we support execution, track real-world velocity, eliminate friction in real-time, and continuously optimize strategies for maximum long-term resilience.',
      deliverables: [
        'Weekly steering committee cadence',
        'Live operational telemetry',
        'Executive coaching & alignment',
        'Quarterly strategic calibration',
      ],
      transitionHint: 'Delivers Sustainable Growth ★',
    },
  ];

  return (
    <section id="approach-section" style={{ padding: '100px 0', borderTop: '1px solid var(--border-subtle)', position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: 780, margin: '0 auto 48px', textAlign: 'center' }}>
          <div className="pill-badge" style={{ marginBottom: 16 }}>
            <span className="pill-dot"></span>
            Our Approach
          </div>
          <h2 className="heading-1" style={{ marginBottom: 16 }}>
            A Proven Framework For Sustainable Growth
          </h2>
          <p className="text-secondary" style={{ fontSize: '1.05rem', lineHeight: 1.6 }}>
            Every engagement follows a structured, interconnected 3-phase methodology designed to uncover opportunities, architect practical roadmaps, and execute with disciplined agility.
          </p>
        </div>

        {/* Process Progression Connector Bar (Relating the 3 Boxes) */}
        <div
          style={{
            maxWidth: 880,
            margin: '0 auto 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 12,
            padding: '12px 24px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-subtle)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {steps.map((s, idx) => (
            <React.Fragment key={s.number}>
              <button
                onClick={() => setActiveStep(idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: activeStep === idx ? 'rgba(20, 243, 193, 0.15)' : 'transparent',
                  color: activeStep === idx ? 'var(--accent-teal)' : 'var(--text-secondary)',
                  border: `1px solid ${activeStep === idx ? 'rgba(20, 243, 193, 0.4)' : 'transparent'}`,
                  borderRadius: 'var(--radius-full)',
                  padding: '6px 14px',
                  fontSize: '0.825rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', opacity: 0.8 }}>{s.number}.</span>
                <span>{s.title}</span>
              </button>
              {idx < steps.length - 1 && (
                <ArrowRight size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* 3 Step Photo Cards Grid */}
        <div className="grid-3" style={{ gap: 24 }}>
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            const isSelected = activeStep === idx;

            return (
              <div
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className="approach-photo-card"
                style={{
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: isSelected ? '1px solid var(--accent-teal)' : '1px solid var(--border-subtle)',
                  boxShadow: isSelected
                    ? '0 16px 36px rgba(0, 0, 0, 0.5), 0 0 24px rgba(20, 243, 193, 0.15)'
                    : '0 8px 24px rgba(0, 0, 0, 0.35)',
                  minHeight: '520px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: 'var(--bg-card)',
                }}
              >
                {/* Background Image */}
                <img
                  src={step.image}
                  alt={step.title}
                  className="approach-card-bg"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 0,
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />

                {/* Dark Gradient Tint Overlay for Crisp Readability */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg, rgba(12, 14, 18, 0.82) 0%, rgba(12, 14, 18, 0.88) 35%, rgba(12, 14, 18, 0.98) 100%)',
                    zIndex: 1,
                    pointerEvents: 'none',
                  }}
                />

                {/* Content Container */}
                <div
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    padding: '32px',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'space-between',
                  }}
                >
                  {/* Top Header: Step Number, Phase & Icon */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '1.85rem',
                            fontWeight: 800,
                            color: isSelected ? 'var(--accent-teal)' : '#ffffff',
                            lineHeight: 1,
                          }}
                        >
                          {step.number}
                        </span>
                        <span
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            letterSpacing: '0.06em',
                            textTransform: 'uppercase',
                            padding: '3px 8px',
                            borderRadius: 'var(--radius-sm)',
                            background: isSelected ? 'rgba(20, 243, 193, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                            color: isSelected ? 'var(--accent-teal)' : 'var(--text-secondary)',
                            fontFamily: 'var(--font-mono)',
                          }}
                        >
                          {step.stepCount}
                        </span>
                      </div>

                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 10,
                          background: isSelected ? 'rgba(20, 243, 193, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)',
                          border: `1px solid ${isSelected ? 'var(--accent-teal)' : 'rgba(255, 255, 255, 0.2)'}`,
                          color: isSelected ? 'var(--accent-teal)' : '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'var(--transition)',
                        }}
                      >
                        <IconComponent size={22} />
                      </div>
                    </div>

                    <h3
                      style={{
                        fontSize: '1.45rem',
                        fontWeight: 700,
                        color: '#ffffff',
                        marginBottom: 6,
                        letterSpacing: '-0.02em',
                        lineHeight: 1.25,
                      }}
                    >
                      {step.title}
                    </h3>
                    <p style={{ color: 'var(--accent-teal)', fontSize: '0.85rem', fontWeight: 600, marginBottom: 14 }}>
                      {step.subtitle}
                    </p>
                    <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.925rem', marginBottom: 24, lineHeight: 1.6 }}>
                      {step.desc}
                    </p>
                  </div>

                  {/* Bottom: Core Deliverables & Inter-box Relation */}
                  <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.12)', paddingTop: 18, marginTop: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                      <span
                        style={{
                          fontSize: '0.725rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          color: 'rgba(255, 255, 255, 0.55)',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 600,
                        }}
                      >
                        Core Deliverables
                      </span>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--accent-teal)',
                          fontWeight: 600,
                        }}
                      >
                        {step.transitionHint}
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                      {step.deliverables.map((item, dIdx) => (
                        <div
                          key={dIdx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            fontSize: '0.85rem',
                            color: 'rgba(255, 255, 255, 0.85)',
                          }}
                        >
                          <span style={{ color: 'var(--accent-teal)', fontSize: '0.75rem' }}>●</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
