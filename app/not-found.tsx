import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        backgroundColor: '#0c0e12',
        color: '#ffffff',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: 540 }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '5rem',
            fontWeight: 800,
            color: 'var(--accent-teal)',
            lineHeight: 1,
            marginBottom: 16,
          }}
        >
          404
        </div>
        <h1 className="heading-1" style={{ marginBottom: 16 }}>
          Page not found
        </h1>
        <p className="text-lead" style={{ marginBottom: 32, fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
          Looks like the page you&apos;re looking for has moved or no longer exists. Let&apos;s get you back on track.
        </p>
        <Link href="/" className="btn btn-teal btn-lg">
          <ArrowLeft size={18} />
          Go back home
        </Link>
      </div>
    </div>
  );
}
