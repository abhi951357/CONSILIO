'use client';

import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, CheckCircle2, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SiteSettings, Service } from '@/types';

export default function ContactPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    serviceNeeded: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) setSettings(data.settings);
      })
      .catch(() => {});

    fetch('/api/admin/services')
      .then((res) => res.json())
      .then((data) => {
        if (data.services) setServices(data.services);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'contact_page',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit message');
      }

      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        serviceNeeded: '',
        message: '',
      });
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const defaultSettings: SiteSettings = settings || {
    siteTitle: 'Consilio',
    tagline: 'Partner with consultants committed to achieving measurable business results.',
    brandName: 'Consilio®',
    description: '',
    contactEmail: 'contact@consilio.com',
    phone: '+1 (800) 247-9812',
    hours: 'Available 24/7 for Enterprise Enquiries',
    address: '742 Evergreen Terrace, Suite 500, Austin, TX 78701',
    facebookUrl: 'https://facebook.com',
    linkedinUrl: 'https://linkedin.com',
    twitterUrl: 'https://twitter.com',
    instagramUrl: 'https://instagram.com',
    heroBadge: '',
    heroTitle: '',
    heroSubtitle: '',
    heroCtaText: 'Book Consultation',
    heroCtaLink: '#',
    heroStats: [],
    announcementText: '',
    announcementEnabled: false,
    ctaBannerTitle: '',
    ctaBannerSubtitle: '',
    ctaBannerButtonText: '',
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar settings={defaultSettings} services={services} />

      {/* Header */}
      <section style={{ padding: '80px 0 40px', textAlign: 'center', position: 'relative' }}>
        <div className="container-narrow">
          <div className="pill-badge" style={{ marginBottom: 16 }}>
            <span className="pill-dot"></span>
            Reach Out
          </div>
          <h1 className="heading-display" style={{ marginBottom: 20 }}>
            Contact Consilio®
          </h1>
          <p className="text-lead" style={{ maxWidth: 680, margin: '0 auto' }}>
            Partner with consultants & business growth leaders committed to achieving measurable business results.
          </p>
        </div>
      </section>

      {/* Main Grid: Form + Direct Contact Cards */}
      <section style={{ padding: '20px 0 100px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40, alignItems: 'start' }}>
            {/* Left: Contact Form */}
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-xl)',
                padding: '40px',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              <h2 className="heading-2" style={{ marginBottom: 8, color: '#ffffff' }}>
                Speak With Our Experts
              </h2>
              <p className="text-secondary" style={{ fontSize: '0.925rem', marginBottom: 28 }}>
                Tell us about your organization&apos;s growth goals or operational challenges. We will connect you with the appropriate practice leader.
              </p>

              {isSuccess ? (
                <div
                  style={{
                    padding: '36px 20px',
                    textAlign: 'center',
                    background: 'rgba(20, 243, 193, 0.05)',
                    border: '1px solid rgba(20, 243, 193, 0.25)',
                    borderRadius: 'var(--radius-lg)',
                  }}
                >
                  <CheckCircle2 size={44} color="var(--accent-teal)" style={{ margin: '0 auto 16px' }} />
                  <h3 className="heading-3" style={{ marginBottom: 8, color: '#ffffff' }}>
                    Message Received
                  </h3>
                  <p className="text-secondary" style={{ fontSize: '0.95rem', marginBottom: 20 }}>
                    Thank you. Your inquiry has been forwarded to our senior executive team. We will respond within one business day.
                  </p>
                  <button className="btn btn-secondary btn-sm" onClick={() => setIsSuccess(false)}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {errorMessage && (
                    <div
                      style={{
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(239, 68, 68, 0.15)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        color: '#f87171',
                        marginBottom: 20,
                        fontSize: '0.9rem',
                      }}
                    >
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid-2" style={{ gap: 16 }}>
                    <div className="form-group">
                      <label className="form-label">Name *</label>
                      <input
                        type="text"
                        required
                        className="form-input"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email *</label>
                      <input
                        type="email"
                        required
                        className="form-input"
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid-2" style={{ gap: 16 }}>
                    <div className="form-group">
                      <label className="form-label">Company</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Company name"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone</label>
                      <input
                        type="tel"
                        className="form-input"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Practice Focus Area</label>
                    <select
                      className="form-select"
                      value={formData.serviceNeeded}
                      onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                    >
                      <option value="">Select advisory area...</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.slug}>
                          {s.title}
                        </option>
                      ))}
                      <option value="strategic-turnaround">Executive Strategy & Turnaround</option>
                      <option value="general">General Enterprise Advisory</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea
                      required
                      rows={4}
                      className="form-textarea"
                      placeholder="Briefly describe your current situation or goals..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-teal btn-lg"
                    style={{ width: '100%', marginTop: 10 }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Transmitting...
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 16, color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    <Sparkles size={13} color="var(--accent-teal)" />
                    <span>Insights on market trends, opportunities, and key movements. Discretion assured.</span>
                  </div>
                </form>
              )}
            </div>

            {/* Right: Direct Hotline & Office Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* Phone card */}
              <div className="card-editorial" style={{ padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
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
                    }}
                  >
                    <Phone size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                      Call us today
                    </h3>
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-teal)' }}>
                      Available 24/7 for executive enquiries
                    </span>
                  </div>
                </div>

                <p className="text-secondary" style={{ fontSize: '0.9rem', marginBottom: 20 }}>
                  You can call our dedicated support team directly for immediate assistance or enterprise consultations.
                </p>

                <a
                  href={`tel:${defaultSettings.phone}`}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  Call Us Now: {defaultSettings.phone}
                </a>
              </div>

              {/* Email card */}
              <div className="card-editorial" style={{ padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(7, 82, 255, 0.15)',
                      color: 'var(--accent-blue)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Mail size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                      Send an email
                    </h3>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Response within 24 business hours
                    </span>
                  </div>
                </div>

                <p className="text-secondary" style={{ fontSize: '0.9rem', marginBottom: 20 }}>
                  Send our partner group an email directly with your RFP or project brief and we&apos;ll get back to you promptly.
                </p>

                <a
                  href={`mailto:${defaultSettings.contactEmail}`}
                  className="btn btn-secondary"
                  style={{ width: '100%' }}
                >
                  Email Us Now: {defaultSettings.contactEmail}
                </a>
              </div>

              {/* Office address */}
              <div className="card-editorial" style={{ padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                      Headquarters
                    </h3>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Austin, Texas Executive Office
                    </span>
                  </div>
                </div>

                <p className="text-secondary" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {defaultSettings.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer settings={defaultSettings} services={services} />
    </main>
  );
}
