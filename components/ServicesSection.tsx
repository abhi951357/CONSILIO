'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Service } from '@/types';

interface ServicesSectionProps {
  services: Service[];
  title?: string;
  subtitle?: string;
  showFilters?: boolean;
}

const serviceMeta: Record<
  string,
  {
    image: string;
    order: number;
    icon: React.ReactNode;
  }
> = {
  'financial-advisory': {
    image: '/images/service-financial-advisory.jpg',
    order: 1,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M12 17v4" />
        <path d="M8 21h8" />
        <path d="M12 7v6" />
        <path d="M9 10l3-3 3 3" />
      </svg>
    ),
  },
  'business-strategy': {
    image: '/images/service-business-strategy.jpg',
    order: 2,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="5" x2="8" y2="9" />
        <line x1="8" y1="5" x2="4" y2="9" />
        <circle cx="18" cy="18" r="2.5" />
        <path d="M7 16c2.5-4 5.5-4 9-2" />
        <polyline points="13 10 16 14 12 15" />
      </svg>
    ),
  },
  'growth-consulting': {
    image: '/images/service-growth-consulting.jpg',
    order: 3,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="10" width="6" height="11" rx="1" />
        <rect x="15" y="4" width="6" height="17" rx="1" />
      </svg>
    ),
  },
};

export function ServicesSection({
  services,
  title = 'Expert Guidance For Every Stage Of Growth',
  subtitle = 'Strategic services designed to solve challenges, improve performance & accelerate growth.',
  showFilters = false,
}: ServicesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(services.map((s) => s.category)))];

  const sortedServices = [...services].sort((a, b) => {
    const orderA = serviceMeta[a.slug]?.order ?? a.order ?? 99;
    const orderB = serviceMeta[b.slug]?.order ?? b.order ?? 99;
    return orderA - orderB;
  });

  const filteredServices =
    selectedCategory === 'All'
      ? sortedServices
      : sortedServices.filter((s) => s.category === selectedCategory);

  return (
    <section id="services-section" style={{ padding: '90px 0' }}>
      <div className="container">
        <div style={{ maxWidth: 760, margin: '0 auto 48px', textAlign: 'center' }}>
          <div className="pill-badge" style={{ marginBottom: 16 }}>
            <span className="pill-dot"></span>
            Expert Solutions
          </div>
          <h2 className="heading-1" style={{ marginBottom: 16 }}>
            {title}
          </h2>
          <p className="text-secondary" style={{ fontSize: '1.05rem' }}>
            {subtitle}
          </p>
        </div>

        {showFilters && categories.length > 2 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 8,
              marginBottom: 44,
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                  background: selectedCategory === cat ? '#ffffff' : 'rgba(255, 255, 255, 0.05)',
                  color: selectedCategory === cat ? '#0c0e12' : 'var(--text-secondary)',
                  border: `1px solid ${selectedCategory === cat ? '#ffffff' : 'var(--border-subtle)'}`,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* 3 Picture-backed Service Boxes (Matching Reference Image) */}
        <div className="grid-3" style={{ gap: 24 }}>
          {filteredServices.map((service) => {
            const meta = serviceMeta[service.slug] || {
              image: '/images/service-growth-consulting.jpg',
              order: 99,
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="10" width="6" height="11" rx="1" />
                  <rect x="15" y="4" width="6" height="17" rx="1" />
                </svg>
              ),
            };

            return (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="service-photo-card"
                style={{
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  minHeight: '440px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  textDecoration: 'none',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                }}
              >
                {/* Background Photo */}
                <img
                  src={meta.image}
                  alt={service.title}
                  className="service-card-img"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 0,
                    transition: 'transform 0.5s ease',
                  }}
                />

                {/* Dark Gradient Overlay for Text Readability */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg, rgba(12, 14, 18, 0) 25%, rgba(12, 14, 18, 0.6) 60%, rgba(12, 14, 18, 0.95) 100%)',
                    zIndex: 1,
                    pointerEvents: 'none',
                  }}
                />

                {/* Content Block at Bottom */}
                <div style={{ position: 'relative', zIndex: 2, padding: '32px' }}>
                  {/* Frosted Glass Icon Badge */}
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      background: 'rgba(255, 255, 255, 0.12)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 18,
                    }}
                  >
                    {meta.icon}
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: '1.45rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      marginBottom: 10,
                      fontFamily: 'var(--font-sans)',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.25,
                    }}
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: '0.95rem',
                      lineHeight: 1.55,
                      color: 'rgba(255, 255, 255, 0.82)',
                      margin: 0,
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    {service.shortDescription}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

