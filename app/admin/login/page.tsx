'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Lock, User, ArrowRight, Loader2, Eye, EyeOff, AlertCircle } from 'lucide-react';

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get('redirect') || '/admin';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Pre-warm admin dashboard route so transition is instantaneous upon successful login
  React.useEffect(() => {
    router.prefetch(redirectTarget);
    router.prefetch('/');
  }, [router, redirectTarget]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed. Access denied.');
      }

      // Stop loading state on success and transition to dashboard
      setLoading(false);
      router.replace(redirectTarget);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid credentials. Access denied.');
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 440,
        background: '#12151c',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-xl)',
        padding: '40px',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(20, 243, 193, 0.2), rgba(7, 82, 255, 0.2))',
            border: '1px solid var(--accent-teal)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-teal)',
            margin: '0 auto 16px',
          }}
        >
          <ShieldCheck size={28} />
        </div>
        <h1 className="heading-2" style={{ color: '#ffffff', marginBottom: 6 }}>
          Consilio CMS Admin
        </h1>
        <p className="text-secondary" style={{ fontSize: '0.875rem' }}>
          Enter your credentials to access the administrative dashboard.
        </p>
      </div>

      {error && (
        <div
          role="alert"
          style={{
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.35)',
            color: '#f87171',
            marginBottom: 20,
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            lineHeight: 1.4,
          }}
        >
          <AlertCircle size={18} style={{ flexShrink: 0 }} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleLogin}>
        <div className="form-group" style={{ marginBottom: 18 }}>
          <label className="form-label" htmlFor="admin-username">
            Admin Username
          </label>
          <div style={{ position: 'relative' }}>
            <input
              id="admin-username"
              type="text"
              required
              autoComplete="username"
              placeholder="Enter admin username"
              className="form-input"
              style={{ paddingLeft: 42 }}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (error) setError('');
              }}
            />
            <User
              size={16}
              color="var(--text-muted)"
              style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}
            />
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: 24 }}>
          <label className="form-label" htmlFor="admin-password">
            Password
          </label>
          <div style={{ position: 'relative' }}>
            <input
              id="admin-password"
              type={showPassword ? 'text' : 'password'}
              required
              autoComplete="current-password"
              placeholder="Enter password"
              className="form-input"
              style={{ paddingLeft: 42, paddingRight: 42 }}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError('');
              }}
            />
            <Lock
              size={16}
              color="var(--text-muted)"
              style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-teal"
          style={{ width: '100%', padding: '13px', fontWeight: 600 }}
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Verifying Credentials...
            </>
          ) : (
            <>
              Access Admin Dashboard
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <Link
          href="/"
          style={{
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            textDecoration: 'none',
            transition: 'color 0.2s ease',
          }}
        >
          &larr; Return to main website
        </Link>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        backgroundColor: '#090a0d',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow effects */}
      <div
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(20, 243, 193, 0.08) 0%, rgba(7, 82, 255, 0.04) 50%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />

      <Suspense
        fallback={
          <div style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Loader2 size={24} className="animate-spin" color="var(--accent-teal)" />
            <span>Loading admin login...</span>
          </div>
        }
      >
        <AdminLoginForm />
      </Suspense>
    </div>
  );
}
