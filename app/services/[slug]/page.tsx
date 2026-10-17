import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, ArrowLeft, TrendingUp, ShieldCheck } from 'lucide-react';
import { getSettings, getServices, getServiceBySlug } from '@/lib/db';
import { Navbar } from '@/components/Navbar';
import { CtaBanner } from '@/components/CtaBanner';
import { Footer } from '@/components/Footer';
export const dynamic = 'force-dynamic';

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  const settings = getSettings();
  const allServices = getServices();

  if (!service) {
    notFound();
  }

  const otherServices = allServices.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar settings={settings} services={allServices} />

      {/* Header Banner */}
      <section style={{ padding: '80px 0 50px', borderBottom: '1px solid var(--border-subtle)', position: 'relative' }}>
        <div className="container">
          <Link
            href="/services"
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
            Back to all services
          </Link>

          <div style={{ maxWidth: 840 }}>
            <div className="pill-badge" style={{ marginBottom: 16 }}>
              <span className="pill-dot"></span>
              {service.category}
            </div>

            <h1 className="heading-display" style={{ marginBottom: 20 }}>
              {service.title}
            </h1>

            <p className="text-lead" style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
              {service.shortDescription}
            </p>
          </div>

          {/* Key Metrics Strip */}
          {service.metrics && service.metrics.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 24,
                marginTop: 40,
                padding: '24px 32px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                maxWidth: 600,
              }}
            >
              {service.metrics.map((m, idx) => (
                <div key={idx} style={{ flex: '1 1 140px' }}>
                  <span
                    style={{
                      fontSize: '2rem',
                      fontWeight: 800,
                      color: 'var(--accent-teal)',
                      fontFamily: 'var(--font-mono)',
                      display: 'block',
                      lineHeight: 1.1,
                    }}
                  >
                    {m.value}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Main Content & Deliverables Grid */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 60 }}>
            {/* Left Column: Deep Overview & Deliverables */}
            <div>
              <h2 className="heading-2" style={{ marginBottom: 20, color: '#ffffff' }}>
                Practice Overview
              </h2>
              <p
                style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.8,
                  color: 'var(--text-secondary)',
                  marginBottom: 40,
                }}
              >
                {service.fullOverview}
              </p>

              <h3 className="heading-3" style={{ marginBottom: 20, color: '#ffffff' }}>
                Key Deliverables & Outcomes
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 50 }}>
                {service.deliverables?.map((del, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 12,
                      padding: '14px 18px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                    }}
                  >
                    <CheckCircle2 size={18} color="var(--accent-teal)" style={{ marginTop: 2, flexShrink: 0 }} />
                    <span style={{ fontSize: '0.95rem', color: '#ffffff', lineHeight: 1.5 }}>{del}</span>
                  </div>
                ))}
              </div>

              {/* Methodology steps */}
              {service.approach && service.approach.length > 0 && (
                <div>
                  <h3 className="heading-3" style={{ marginBottom: 24, color: '#ffffff' }}>
                    Methodology & Engagement Workflow
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {service.approach.map((step, idx) => (
                      <div
                        key={idx}
                        className="card-editorial"
                        style={{ padding: '24px 28px' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.85rem',
                              fontWeight: 700,
                              color: 'var(--accent-teal)',
                              padding: '2px 8px',
                              background: 'rgba(20, 243, 193, 0.1)',
                              borderRadius: '4px',
                            }}
                          >
                            STEP {step.step}
                          </span>
                          <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#ffffff' }}>
                            {step.title}
                          </h4>
                        </div>
                        <p className="text-secondary" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Direct Practice Consultation Form */}
            <div>
              <div
                style={{
                  position: 'sticky',
                  top: 100,
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '36px',
                  boxShadow: 'var(--shadow-lg)',
                }}
              >
                <div className="pill-badge" style={{ marginBottom: 16 }}>
                  <span className="pill-dot"></span>
                  Advisory Inquiry
                </div>
                <h3 className="heading-2" style={{ fontSize: '1.4rem', marginBottom: 10, color: '#ffffff' }}>
                  Consult On {service.title}
                </h3>
                <p className="text-secondary" style={{ fontSize: '0.9rem', marginBottom: 24 }}>
                  Connect directly with our {service.title} practice leads to discuss your company&apos;s objectives.
                </p>

                <form action="/api/leads" method="POST" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <input type="hidden" name="serviceNeeded" value={service.slug} />
                  <input type="hidden" name="source" value={`service_page_${service.slug}`} />

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Full Name *</label>
                    <input type="text" name="name" required className="form-input" placeholder="Your name" />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Work Email *</label>
                    <input type="email" name="email" required className="form-input" placeholder="name@company.com" />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Company & Stage</label>
                    <input type="text" name="company" className="form-input" placeholder="e.g. Acme Corp (Series A)" />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Phone</label>
                    <input type="tel" name="phone" className="form-input" placeholder="+1 (555) 000-0000" />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Key Challenge or Objective *</label>
                    <textarea
                      name="message"
                      required
                      rows={3}
                      className="form-textarea"
                      placeholder={`Tell us what you'd like to achieve regarding ${service.title.toLowerCase()}...`}
                    />
                  </div>

                  <button type="submit" className="btn btn-teal" style={{ width: '100%', marginTop: 8 }}>
                    Submit Practice Inquiry &rarr;
                  </button>

                  <p className="text-muted" style={{ fontSize: '0.785rem', textAlign: 'center', margin: 0 }}>
                    Strict executive discretion. Non-disclosure agreements honored.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Services Strip */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)' }}>
        <div className="container">
          <h3 className="heading-2" style={{ marginBottom: 30, color: '#ffffff' }}>
            Explore More Business Services
          </h3>
          <div className="grid-3">
            {otherServices.map((other) => (
              <Link key={other.id} href={`/services/${other.slug}`} className="card-editorial">
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--accent-teal)',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: 10,
                  }}
                >
                  {other.category}
                </span>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', marginBottom: 10 }}>
                  {other.title}
                </h4>
                <p className="text-secondary" style={{ fontSize: '0.875rem', marginBottom: 18 }}>
                  {other.shortDescription}
                </p>
                <span style={{ color: 'var(--accent-teal)', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', fontWeight: 600 }}>
                  Learn more &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner settings={settings} services={allServices} />
      <Footer settings={settings} services={allServices} />
    </main>
  );
}
