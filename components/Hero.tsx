'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { ConsultationModal } from './ConsultationModal';
import { FlowingWebCanvas } from './FlowingWebCanvas';
import { SiteSettings, Service } from '@/types';

interface HeroProps {
  settings: SiteSettings;
  services?: Service[];
}

export function Hero({ settings, services = [] }: HeroProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const rawTitle = settings.heroTitle || 'Unlocking growth through expertise';

  const renderTitle = (title: string) => {
    if (title.toLowerCase().includes('expertise')) {
      const parts = title.split(/(expertise)/i);
      return (
        <>
          {parts.map((part, i) =>
            part.toLowerCase() === 'expertise' ? (
              <span
                key={i}
                style={{
                  color: 'var(--accent-teal)',
                  textShadow: '0 0 28px rgba(20, 243, 193, 0.45)',
                }}
              >
                {part}
              </span>
            ) : (
              part
            )
          )}
        </>
      );
    }
    return title;
  };

  return (
    <>
      <section
        style={{
          padding: '100px 0 70px',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#0c0e12',
          minHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* Layer 1: Background Image with dark luxury lighting */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: "url('/images/hero-flowing-web.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.35,
            mixBlendMode: 'screen',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* Layer 2: Subtle gradient vignettes top and bottom for seamless blend */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at 50% 30%, transparent 20%, rgba(12, 14, 18, 0.75) 65%, #0c0e12 100%), linear-gradient(180deg, rgba(12, 14, 18, 0.8) 0%, transparent 25%, transparent 75%, #0c0e12 100%)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* Layer 3: Interactive Animated Flowing Web Canvas */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 }}>
          <FlowingWebCanvas lineCount={32} />
        </div>

        {/* Layer 4: Content Container */}
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ maxWidth: 960, margin: '0', textAlign: 'left' }}>
            {/* Display Headline matching user reference image */}
            <h1
              className="heading-display"
              style={{
                marginBottom: 24,
                fontSize: 'clamp(2.8rem, 6vw, 4.6rem)',
                fontWeight: 600,
                letterSpacing: '-0.04em',
                maxWidth: 700,
              }}
            >
              {renderTitle(rawTitle)}
            </h1>

            {/* Description */}
            <p className="text-secondary" style={{ maxWidth: 600, margin: '0 0 32px', fontSize: '1.1rem', lineHeight: 1.7 }}>
              We help ambitious companies navigate challenges, uncover opportunities &amp; achieve sustainable business growth.
            </p>

            {/* Action CTAs */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: 16,
                marginBottom: 54,
              }}
            >
              <button
                onClick={() => setModalOpen(true)}
                className="btn btn-teal btn-lg"
                style={{ fontWeight: 700 }}
              >
                {settings.heroCtaText || 'Book Consultation'}
                <ArrowUpRight size={18} />
              </button>
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
