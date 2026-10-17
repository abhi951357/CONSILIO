import React from 'react';
import { getSettings, getServices, getTeam, getFAQs } from '@/lib/db';
import { Navbar } from '@/components/Navbar';
import { ValuesSection } from '@/components/ValuesSection';
import { ApproachSection } from '@/components/ApproachSection';
import { ComparisonSection } from '@/components/ComparisonSection';
import { FaqSection } from '@/components/FaqSection';
import { CtaBanner } from '@/components/CtaBanner';
import { Footer } from '@/components/Footer';

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const settings = getSettings();
  const services = getServices();
  const team = getTeam();
  const faqs = getFAQs();

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar settings={settings} services={services} />

      {/* Hero Header */}
      <section style={{ padding: '80px 0 40px', textAlign: 'center', position: 'relative' }}>
        <div className="container-narrow">
          <div className="pill-badge" style={{ marginBottom: 16 }}>
            <span className="pill-dot"></span>
            About Consilio®
          </div>
          <h1 className="heading-display" style={{ marginBottom: 20 }}>
            Trusted Advisors Delivering Strategic Clarity
          </h1>
          <p className="text-lead" style={{ maxWidth: 740, margin: '0 auto' }}>
            Consilio partners with ambitious leadership teams to simplify complexity, strengthen strategic decision-making, and create sustainable enterprise growth through deep commercial expertise.
          </p>
        </div>
      </section>

      {/* Narrative & Mission */}
      <section style={{ padding: '60px 0 90px' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 40,
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-xl)',
              padding: '48px',
            }}
          >
            <div>
              <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-teal)', display: 'block', marginBottom: 12 }}>
                Our Mission
              </span>
              <h2 className="heading-2" style={{ color: '#ffffff', marginBottom: 20 }}>
                We believe durable growth is engineered, not accidental.
              </h2>
              <p className="text-secondary" style={{ fontSize: '1rem', lineHeight: 1.7, marginBottom: 18 }}>
                Founded by veteran enterprise strategists and former operators, Consilio was built to bridge the canyon between theoretical slide decks and practical on-the-ground execution.
              </p>
              <p className="text-secondary" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
                We don’t just diagnose what’s wrong—we build clear roadmaps, align C-suite priorities, and remain actively engaged throughout implementation until targets are achieved.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, justifyContent: 'center' }}>
              <div style={{ padding: '20px 24px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-mono)', display: 'block' }}>
                  175+
                </span>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Enterprise and mid-market organizations advised across 14 sectors
                </span>
              </div>

              <div style={{ padding: '20px 24px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-teal)', fontFamily: 'var(--font-mono)', display: 'block' }}>
                  98%
                </span>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Client satisfaction and retention rate across multi-year advisory programs
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <ValuesSection />

      {/* Team Section */}
      <section style={{ padding: '90px 0', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ maxWidth: 760, margin: '0 auto 60px', textAlign: 'center' }}>
            <div className="pill-badge" style={{ marginBottom: 16 }}>
              <span className="pill-dot"></span>
              Our Leadership
            </div>
            <h2 className="heading-1" style={{ marginBottom: 16 }}>
              Meet The Partners Driving Your Growth
            </h2>
            <p className="text-secondary" style={{ fontSize: '1.05rem' }}>
              Our senior advisors bring decades of front-line operating and C-suite experience across finance, supply chain, and organizational scaling.
            </p>
          </div>

          <div className="grid-3">
            {team.map((member) => (
              <div key={member.id} className="card-editorial" style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(20, 243, 193, 0.15), rgba(7, 82, 255, 0.15))',
                    border: '1px solid var(--accent-teal)',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '1.4rem',
                    fontFamily: 'var(--font-mono)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                  }}
                >
                  {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>

                <h3 className="heading-3" style={{ marginBottom: 4, color: '#ffffff' }}>
                  {member.name}
                </h3>
                <span
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--accent-teal)',
                    display: 'block',
                    marginBottom: 16,
                  }}
                >
                  {member.role}
                </span>

                <p className="text-secondary" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ApproachSection />
      <ComparisonSection />
      <FaqSection faqs={faqs} />
      <CtaBanner settings={settings} services={services} />
      <Footer settings={settings} services={services} />
    </main>
  );
}
