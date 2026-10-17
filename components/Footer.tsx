import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { SiteSettings, Service } from '@/types';

interface FooterProps {
  settings: SiteSettings;
  services?: Service[];
}

const defaultFooterServices = [
  { id: 'srv-1', slug: 'growth-consulting', title: 'Growth Consulting' },
  { id: 'srv-2', slug: 'financial-advisory', title: 'Financial Advisory' },
  { id: 'srv-3', slug: 'business-strategy', title: 'Business Strategy' },
];

export function Footer({ settings, services = [] }: FooterProps) {
  const displayServices = services && services.length > 0 ? services : defaultFooterServices;

  return (
    <footer style={{ backgroundColor: '#07090c', borderTop: '1px solid var(--border-subtle)', paddingTop: 70, paddingBottom: 40 }}>
      <div className="container">
        {/* Top Section */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 40,
            marginBottom: 60,
          }}
        >
          {/* Brand Info */}
          <div style={{ maxWidth: 320 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '6px',
                  background: 'linear-gradient(135deg, #ffffff 0%, var(--accent-teal) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0c0e12',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                }}
              >
                C
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#ffffff' }}>
                {settings.brandName || 'Consilio®'}
              </span>
            </div>
            
            <p className="text-secondary" style={{ fontSize: '0.9rem', marginBottom: 20, lineHeight: 1.6 }}>
              {settings.description || 'Partner with expert consultants & business growth leaders committed to achieving measurable business results.'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-secondary)' }}>
                <Phone size={15} color="var(--accent-teal)" />
                <a href={`tel:${settings.phone}`} style={{ color: 'inherit' }}>
                  {settings.phone}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-secondary)' }}>
                <Mail size={15} color="var(--accent-teal)" />
                <a href={`mailto:${settings.contactEmail}`} style={{ color: 'inherit' }}>
                  {settings.contactEmail}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, color: 'var(--text-secondary)' }}>
                <MapPin size={15} color="var(--accent-teal)" style={{ marginTop: 3, flexShrink: 0 }} />
                <span>{settings.address}</span>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4
              style={{
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#ffffff',
                marginBottom: 20,
                fontFamily: 'var(--font-mono)',
              }}
            >
              Services
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {displayServices.slice(0, 6).map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  prefetch={true}
                  style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Pages */}
          <div>
            <h4
              style={{
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#ffffff',
                marginBottom: 20,
                fontFamily: 'var(--font-mono)',
              }}
            >
              Pages
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Link href="/" prefetch={true} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Home
              </Link>
              <Link href="/services" prefetch={true} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Our Services
              </Link>
              <Link href="/case-studies" prefetch={true} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Case Studies
              </Link>
              <Link href="/about" prefetch={true} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                About Consilio
              </Link>
              <Link href="/blogs" prefetch={true} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                News & Insights
              </Link>
              <Link href="/contact" prefetch={true} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Get in Touch
              </Link>
            </div>
          </div>

          {/* Socials & Administration */}
          <div>
            <h4
              style={{
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#ffffff',
                marginBottom: 20,
                fontFamily: 'var(--font-mono)',
              }}
            >
              Connect & Control
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
              <a
                href={settings.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 6 }}
              >
                LinkedIn <ArrowUpRight size={13} />
              </a>
              <a
                href={settings.twitterUrl}
                target="_blank"
                rel="noreferrer"
                style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 6 }}
              >
                Twitter / X <ArrowUpRight size={13} />
              </a>
              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noreferrer"
                style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 6 }}
              >
                Facebook <ArrowUpRight size={13} />
              </a>
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noreferrer"
                style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 6 }}
              >
                Instagram <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: 28,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
          }}
        >
          <div>
            © 2026 Consilio®. All rights reserved. Strategic Business & Enterprise Advisory.
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security Disclosures</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
