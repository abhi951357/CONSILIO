'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Star, ShieldCheck } from 'lucide-react';
import { ConsultationModal } from './ConsultationModal';
import { Service, SiteSettings } from '@/types';

interface CtaBannerProps {
  settings: SiteSettings;
  services?: Service[];
}

export function CtaBanner({ settings, services = [] }: CtaBannerProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section style={{ padding: '90px 0', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle background glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 700,
            height: 400,
            background: 'radial-gradient(circle, rgba(20, 243, 193, 0.08) 0%, rgba(7, 82, 255, 0.04) 50%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(24, 27, 36, 0.95) 0%, rgba(15, 17, 24, 0.98) 100%)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-xl)',
              padding: '64px 48px',
              textAlign: 'center',
              boxShadow: 'var(--shadow-lg)',
              position: 'relative',
            }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
              <div style={{ display: 'flex', color: '#f59e0b', gap: 2 }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#f59e0b" />
                ))}
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff' }}>4.8/5</span>
              <span className="text-muted" style={{ fontSize: '0.85rem' }}>— Trusted by 175+ Executive Teams</span>
            </div>

            <h2 className="heading-display" style={{ marginBottom: 18, maxWidth: 800, margin: '0 auto 18px' }}>
              {settings.ctaBannerTitle || 'Build clarity. Unlock growth.'}
            </h2>

            <p className="text-lead" style={{ maxWidth: 620, margin: '0 auto 36px', fontSize: '1.1rem' }}>
              {settings.ctaBannerSubtitle || 'Book a consultation and get a clear view of what’s driving your business — so you can act faster.'}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
              <button
                onClick={() => setModalOpen(true)}
                className="btn btn-teal btn-lg"
                style={{ fontWeight: 700 }}
              >
                {settings.ctaBannerButtonText || 'Book Consultation'}
                <ArrowUpRight size={18} />
              </button>

              <Link
                href="/contact"
                prefetch={true}
                className="btn btn-secondary btn-lg"
              >
                Reach Out Directly
              </Link>
            </div>

            <div
              style={{
                marginTop: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
              }}
            >
              <ShieldCheck size={16} color="var(--accent-teal)" />
              <span>Strict enterprise NDA and client discretion guaranteed.</span>
            </div>
          </div>
        </div>
      </section>

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        services={services}
      />
    </>
  );
}
