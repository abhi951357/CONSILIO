'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Handshake } from 'lucide-react';

export function AboutSection() {
  return (
    <section
      className="section-light"
      style={{
        backgroundColor: '#ffffff',
        padding: '90px 0',
        borderTop: '1px solid #e5e7eb',
        borderBottom: '1px solid #e5e7eb',
      }}
    >
      <div className="container">
        {/* Top Row: Heading on left, Description & CTA on right */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 40,
          }}
        >
          {/* Left Column: Heading in the same font as the Hero title */}
          <div style={{ flex: '1 1 240px', maxWidth: 320 }}>
            <h2
              style={{
                color: '#0c111c',
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                letterSpacing: '-0.035em',
                lineHeight: 1.15,
                margin: 0,
                fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
              }}
            >
              About Consilio
            </h2>
          </div>

          {/* Right Column: Enlarged Description & Right-aligned CTA + Trust note */}
          <div
            style={{
              flex: '2 1 540px',
              maxWidth: 780,
              marginLeft: 'auto',
            }}
          >
            <p
              style={{
                fontSize: 'clamp(1.35rem, 2.3vw, 1.8rem)',
                lineHeight: 1.55,
                color: '#1f2937',
                fontFamily: 'var(--font-sans)',
                fontWeight: 500,
                letterSpacing: '-0.025em',
                margin: 0,
              }}
            >
              Consilio partners with ambitious teams to simplify complexity, strengthen
              decision-making &amp; create sustainable growth through strategic expertise.
            </p>

            {/* Aligned to the far right below the description */}
            <div
              style={{
                marginTop: 32,
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: 20,
              }}
            >
              {/* Talk with us button with dark square arrow box */}
              <Link
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: '#ffffff',
                  border: '1px solid #d1d5db',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
                  transition: 'all 0.2s ease',
                }}
              >
                <span
                  style={{
                    padding: '9px 18px',
                    color: '#0c111c',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  Talk with us
                </span>
                <span
                  style={{
                    background: '#072728',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                  }}
                >
                  <ArrowUpRight size={17} />
                </span>
              </Link>

              {/* Overlapping circular avatars + Trusted by 175 businesses */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80"
                    alt="Client avatar"
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid #ffffff',
                      zIndex: 3,
                    }}
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80"
                    alt="Client avatar"
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid #ffffff',
                      marginLeft: -10,
                      zIndex: 2,
                    }}
                  />
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80"
                    alt="Client avatar"
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid #ffffff',
                      marginLeft: -10,
                      zIndex: 1,
                    }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: 1.25 }}>
                  <span style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: 500, fontFamily: 'var(--font-sans)' }}>
                    Trusted by
                  </span>
                  <span style={{ fontSize: '0.925rem', color: '#0c111c', fontWeight: 700, fontFamily: 'var(--font-sans)' }}>
                    175 businesses
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Three Boxes Under The Text (Matching Reference Image) */}
        <div className="grid-3" style={{ marginTop: 56, gap: 24 }}>
          {/* Box 1: Strategic Thinking */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '18px',
              padding: '36px',
              minHeight: 380,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
              transition: 'all 0.25s ease',
            }}
          >
            {/* Tactics / Strategy Icon */}
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: '10px',
                backgroundColor: '#e8f7f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#087f73"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" y1="5" x2="8" y2="9" />
                <line x1="8" y1="5" x2="4" y2="9" />
                <circle cx="18" cy="18" r="2.5" />
                <path d="M7 16c2.5-4 5.5-4 9-2" />
                <polyline points="13 10 16 14 12 15" />
              </svg>
            </div>

            <div>
              <h3
                style={{
                  fontSize: '1.45rem',
                  fontWeight: 700,
                  color: '#0c111c',
                  marginBottom: 12,
                  fontFamily: 'var(--font-sans)',
                  letterSpacing: '-0.02em',
                }}
              >
                Strategic Thinking
              </h3>
              <p
                style={{
                  fontSize: '0.975rem',
                  lineHeight: 1.6,
                  color: '#525866',
                  fontFamily: 'var(--font-sans)',
                  margin: 0,
                }}
              >
                We help leaders make informed decisions with clear strategies &amp; a long-term
                perspective on business growth.
              </p>
            </div>
          </div>

          {/* Box 2: Business Expertise (Dark Teal Featured Box) */}
          <div
            style={{
              backgroundColor: '#072728',
              borderRadius: '18px',
              padding: '36px',
              minHeight: 380,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(7, 39, 40, 0.25)',
              transition: 'all 0.25s ease',
            }}
          >
            {/* Top-left Teal Radial Sunburst Line Pattern */}
            <svg
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '190px',
                pointerEvents: 'none',
              }}
              viewBox="0 0 340 190"
              fill="none"
            >
              <defs>
                <radialGradient id="tealSunburstGlow" cx="30%" cy="0%" r="70%">
                  <stop offset="0%" stopColor="#14f3c1" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#14f3c1" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#tealSunburstGlow)" />
              {Array.from({ length: 32 }).map((_, i) => {
                const angle = (i * 3.4 - 30) * (Math.PI / 180);
                const x2 = 70 + Math.cos(angle) * 260;
                const y2 = -20 + Math.sin(angle) * 260;
                return (
                  <line
                    key={i}
                    x1="70"
                    y1="-20"
                    x2={x2}
                    y2={y2}
                    stroke="rgba(20, 243, 193, 0.3)"
                    strokeWidth="1"
                  />
                );
              })}
              <circle cx="70" cy="-20" r="45" stroke="rgba(20, 243, 193, 0.32)" strokeWidth="1" />
              <circle cx="70" cy="-20" r="85" stroke="rgba(20, 243, 193, 0.2)" strokeWidth="1" />
              <circle cx="70" cy="-20" r="125" stroke="rgba(20, 243, 193, 0.12)" strokeWidth="1" />
              <circle cx="70" cy="-20" r="165" stroke="rgba(20, 243, 193, 0.07)" strokeWidth="1" />
            </svg>

            {/* Spacer for top artwork */}
            <div style={{ height: 46, position: 'relative', zIndex: 2 }} />

            <div style={{ position: 'relative', zIndex: 2 }}>
              <h3
                style={{
                  fontSize: '1.45rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: 12,
                  fontFamily: 'var(--font-sans)',
                  letterSpacing: '-0.02em',
                }}
              >
                Business Expertise
              </h3>
              <p
                style={{
                  fontSize: '0.975rem',
                  lineHeight: 1.6,
                  color: '#a0b8b6',
                  fontFamily: 'var(--font-sans)',
                  margin: 0,
                }}
              >
                Our team brings deep experience across finance &amp; operations to help
                organizations achieve measurable outcomes.
              </p>
            </div>
          </div>

          {/* Box 3: Trusted Partnership */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '18px',
              padding: '36px',
              minHeight: 380,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
              transition: 'all 0.25s ease',
            }}
          >
            {/* Handshake Icon in Mint Square */}
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: '10px',
                backgroundColor: '#e8f7f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Handshake size={23} color="#087f73" strokeWidth={1.9} />
            </div>

            <div>
              <h3
                style={{
                  fontSize: '1.45rem',
                  fontWeight: 700,
                  color: '#0c111c',
                  marginBottom: 12,
                  fontFamily: 'var(--font-sans)',
                  letterSpacing: '-0.02em',
                }}
              >
                Trusted Partnership
              </h3>
              <p
                style={{
                  fontSize: '0.975rem',
                  lineHeight: 1.6,
                  color: '#525866',
                  fontFamily: 'var(--font-sans)',
                  margin: 0,
                }}
              >
                We work closely with clients, providing honest guidance and tailored
                solutions that support lasting success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

