import React from 'react';
import { Target, Award, Users2, Lightbulb } from 'lucide-react';

export function ValuesSection() {
  const values = [
    {
      title: 'Strategy First',
      desc: 'Every recommendation starts with your foundational commercial goals, ensuring strategies are tailored precisely to your unit economics and industry landscape.',
      icon: Target,
    },
    {
      title: 'Executive Leadership',
      desc: 'Our focus extends far beyond superficial quick wins, instilling resilient operating frameworks and leadership clarity that strengthens institutional endurance.',
      icon: Award,
    },
    {
      title: 'Embedded Partnership',
      desc: 'We work shoulder-to-shoulder with your operating team, transferring critical competencies, solving friction points together, and ensuring complete internal ownership.',
      icon: Users2,
    },
    {
      title: 'Evidence-Based Innovation',
      desc: 'We combine granular financial telemetry, competitive intelligence, and proven execution playbooks to help your leadership make fearless, data-backed decisions.',
      icon: Lightbulb,
    },
  ];

  return (
    <section style={{ padding: '90px 0', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div style={{ maxWidth: 760, margin: '0 auto 60px', textAlign: 'center' }}>
          <div className="pill-badge" style={{ marginBottom: 16 }}>
            <span className="pill-dot"></span>
            Our Values
          </div>
          <h2 className="heading-1" style={{ marginBottom: 16 }}>
            Principles Behind Our Client Partnerships
          </h2>
          <p className="text-secondary" style={{ fontSize: '1.05rem' }}>
            Our advisory practice is founded on radical transparency, mutual accountability, and pragmatic thinking—helping leaders make smarter decisions under uncertainty.
          </p>
        </div>

        <div className="grid-4">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div key={idx} className="card-editorial" style={{ display: 'flex', flexDirection: 'column' }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(20, 243, 193, 0.1)',
                    color: 'var(--accent-teal)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 20,
                  }}
                >
                  <Icon size={22} />
                </div>
                <h3 className="heading-3" style={{ marginBottom: 12, color: '#ffffff' }}>
                  {val.title}
                </h3>
                <p className="text-secondary" style={{ fontSize: '0.9rem', lineHeight: 1.6, flex: 1 }}>
                  {val.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
