import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Quote, Building2, MapPin, Briefcase } from 'lucide-react';
import { getSettings, getServices, getCaseStudies, getCaseStudyBySlug } from '@/lib/db';
import { Navbar } from '@/components/Navbar';
import { CtaBanner } from '@/components/CtaBanner';
import { Footer } from '@/components/Footer';

export const dynamic = 'force-dynamic';

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  const settings = getSettings();
  const allServices = getServices();
  const allStudies = getCaseStudies();

  if (!study) {
    notFound();
  }

  const otherStudies = allStudies.filter((s) => s.id !== study.id).slice(0, 2);

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar settings={settings} services={allServices} />

      {/* Case Header */}
      <section style={{ padding: '80px 0 50px', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <Link
            href="/case-studies"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              color: 'var(--text-secondary)',
              fontSize: '0.875rem',
              marginBottom: 28,
            }}
          >
            <ArrowLeft size={16} />
            Back to all case studies
          </Link>

          <div style={{ maxWidth: 960 }}>
            <div className="pill-badge" style={{ marginBottom: 16 }}>
              <span className="pill-dot"></span>
              {study.industry}
            </div>

            <h1 className="heading-display" style={{ marginBottom: 24, fontSize: 'clamp(2.2rem, 4vw, 3.4rem)' }}>
              {study.title}
            </h1>

            <p className="text-lead" style={{ maxWidth: 800, marginBottom: 40, color: 'var(--text-secondary)' }}>
              {study.summary}
            </p>

            {/* Client Metadata Metadata Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: 20,
                padding: '24px 30px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: 4 }}>
                  Client
                </span>
                <span style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>
                  {study.client}
                </span>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: 4 }}>
                  Advisory Service
                </span>
                <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--accent-teal)' }}>
                  {study.serviceCategory}
                </span>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: 4 }}>
                  Location
                </span>
                <span style={{ fontSize: '1rem', fontWeight: 600, color: '#ffffff' }}>
                  {study.location}
                </span>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: 4 }}>
                  Key Outcome
                </span>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-teal)', fontFamily: 'var(--font-mono)' }}>
                  {study.keyMetric}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Metrics Callouts */}
      <section style={{ padding: '60px 0', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="grid-3">
            {study.metrics?.map((m, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '30px',
                  textAlign: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: '3rem',
                    fontWeight: 800,
                    color: idx === 0 ? 'var(--accent-teal)' : '#ffffff',
                    fontFamily: 'var(--font-mono)',
                    lineHeight: 1,
                    display: 'block',
                    marginBottom: 10,
                  }}
                >
                  {m.value}
                </span>
                <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Narrative Section: Challenge, Approach, Outcome */}
      <section style={{ padding: '80px 0' }}>
        <div className="container-narrow">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 60 }}>
            {/* The Challenge */}
            <div>
              <div className="pill-badge" style={{ marginBottom: 14 }}>
                <span className="pill-dot"></span>
                Phase I
              </div>
              <h2 className="heading-1" style={{ marginBottom: 18, color: '#ffffff' }}>
                The Challenge
              </h2>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
                {study.challenge}
              </p>
            </div>

            {/* The Approach */}
            <div>
              <div className="pill-badge" style={{ marginBottom: 14 }}>
                <span className="pill-dot"></span>
                Phase II
              </div>
              <h2 className="heading-1" style={{ marginBottom: 18, color: '#ffffff' }}>
                The Approach
              </h2>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
                {study.approach}
              </p>
            </div>

            {/* The Outcome */}
            <div>
              <div className="pill-badge" style={{ marginBottom: 14 }}>
                <span className="pill-dot"></span>
                Phase III
              </div>
              <h2 className="heading-1" style={{ marginBottom: 18, color: '#ffffff' }}>
                The Commercial Outcome
              </h2>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
                {study.outcome}
              </p>
            </div>

            {/* Executive Quote Card */}
            {study.clientQuote && (
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(20, 243, 193, 0.06), rgba(7, 82, 255, 0.04))',
                  border: '1px solid rgba(20, 243, 193, 0.25)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '40px',
                  position: 'relative',
                }}
              >
                <Quote size={40} color="var(--accent-teal)" style={{ opacity: 0.4, marginBottom: 16 }} />
                <p style={{ fontSize: '1.3rem', fontStyle: 'italic', lineHeight: 1.6, color: '#ffffff', marginBottom: 20 }}>
                  &ldquo;{study.clientQuote}&rdquo;
                </p>
                <div>
                  <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', display: 'block' }}>
                    {study.clientAuthor}
                  </span>
                  <span style={{ fontSize: '0.875rem', color: 'var(--accent-teal)' }}>
                    {study.clientRole}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Explore More Case Studies */}
      {otherStudies.length > 0 && (
        <section style={{ padding: '80px 0', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)' }}>
          <div className="container">
            <h3 className="heading-2" style={{ marginBottom: 30, color: '#ffffff' }}>
              Explore More Client Stories
            </h3>
            <div className="grid-2">
              {otherStudies.map((other) => (
                <Link key={other.id} href={`/case-studies/${other.slug}`} className="card-editorial">
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-teal)', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>
                    {other.industry}
                  </span>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: 12 }}>
                    {other.title}
                  </h4>
                  <p className="text-secondary" style={{ fontSize: '0.9rem', marginBottom: 16 }}>
                    {other.summary}
                  </p>
                  <span style={{ color: 'var(--accent-teal)', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', fontWeight: 600 }}>
                    Read Case Study &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner settings={settings} services={allServices} />
      <Footer settings={settings} services={allServices} />
    </main>
  );
}
