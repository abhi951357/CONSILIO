'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ArrowUpRight, ChevronDown, TrendingUp, DollarSign, Compass } from 'lucide-react';
import { ConsultationModal } from './ConsultationModal';
import { Service, SiteSettings } from '@/types';

interface NavbarProps {
  settings: SiteSettings;
  services?: Service[];
}

const defaultPracticeList = [
  {
    id: 'srv-1',
    slug: 'growth-consulting',
    title: 'Growth Consulting',
    shortDescription: 'Identify opportunities, overcome barriers & scale revenue.',
    icon: TrendingUp,
  },
  {
    id: 'srv-2',
    slug: 'financial-advisory',
    title: 'Financial Advisory',
    shortDescription: 'Strategic capital allocation, pricing architecture & cash flow.',
    icon: DollarSign,
  },
  {
    id: 'srv-3',
    slug: 'business-strategy',
    title: 'Business Strategy',
    shortDescription: 'Market positioning, operational roadmaps & competitive moats.',
    icon: Compass,
  },
];

export function Navbar({ settings, services = [] }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingPath, setPendingPath] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear optimistic active state when route finishes changing
  useEffect(() => {
    setPendingPath(null);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  // Pre-warm primary navigation routes into Next.js router cache
  useEffect(() => {
    const warmRoutes = [
      '/',
      '/services',
      '/services/growth-consulting',
      '/services/financial-advisory',
      '/services/business-strategy',
      '/case-studies',
      '/about',
      '/blogs',
      '/contact',
    ];

    const prewarm = () => {
      warmRoutes.forEach((route) => {
        try {
          router.prefetch(route);
        } catch {
          // ignore prefetch errors
        }
      });
    };

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const idleId = (window as unknown as { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(prewarm);
      return () => {
        if ('cancelIdleCallback' in window) {
          (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
        }
      };
    } else {
      const timer = setTimeout(prewarm, 120);
      return () => clearTimeout(timer);
    }
  }, [router]);

  // Outside click listener active only when dropdown is open
  useEffect(() => {
    if (!servicesDropdownOpen) return;

    const handleClickOutside = (event: MouseEvent | PointerEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };

    document.addEventListener('pointerdown', handleClickOutside, { passive: true });
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, [servicesDropdownOpen]);

  // Keyboard accessibility: Escape closes any open menu or dropdown
  useEffect(() => {
    if (!mobileMenuOpen && !servicesDropdownOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setServicesDropdownOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen, servicesDropdownOpen]);

  // Hash listener for #book-consultation
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#book-consultation') {
        setIsModalOpen(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const activeServices = useMemo(() => {
    return services && services.length > 0 ? services : defaultPracticeList;
  }, [services]);

  const navLinks = useMemo(
    () => [
      { label: 'Home', href: '/' },
      { label: 'Our Services', href: '/services', hasDropdown: true },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blogs' },
      { label: 'Contact', href: '/contact' },
    ],
    []
  );

  const effectivePath = pendingPath || pathname;

  const handlePointerEnterOrDown = useCallback(
    (href: string) => {
      try {
        router.prefetch(href);
      } catch {
        // ignore
      }
    },
    [router]
  );

  const handleLinkClick = useCallback((href: string) => {
    setPendingPath(href);
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
  }, []);

  const handleHomeClick = useCallback(
    (e: React.MouseEvent) => {
      if (pathname === '/') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        handleLinkClick('/');
      }
    },
    [pathname, handleLinkClick]
  );

  const handleMouseEnterDropdown = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setServicesDropdownOpen(true);
  }, []);

  const handleMouseLeaveDropdown = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 140);
  }, []);

  return (
    <>
      <header className="navbar-glass">
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 74,
          }}
        >
          {/* Brand Logo */}
          <Link
            href="/"
            onClick={handleHomeClick}
            onPointerDown={() => handlePointerEnterOrDown('/')}
            prefetch={true}
            style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #ffffff 0%, var(--accent-teal) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0c0e12',
                fontWeight: 800,
                fontSize: '1.2rem',
                letterSpacing: '-0.05em',
                boxShadow: '0 2px 10px rgba(20, 243, 193, 0.25)',
              }}
            >
              C
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#ffffff', lineHeight: 1.1 }}>
                {settings.brandName || 'Consilio®'}
              </span>
              <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                Strategic Advisory
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" style={{ gap: 4 }}>
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                const isServicesActive = effectivePath === '/services' || effectivePath.startsWith('/services/');
                return (
                  <div
                    key={link.href}
                    ref={dropdownRef}
                    className="nav-dropdown-container"
                    onMouseEnter={handleMouseEnterDropdown}
                    onMouseLeave={handleMouseLeaveDropdown}
                  >
                    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                      <Link
                        href={link.href}
                        prefetch={true}
                        onPointerEnter={() => handlePointerEnterOrDown(link.href)}
                        onPointerDown={() => handlePointerEnterOrDown(link.href)}
                        onClick={() => handleLinkClick(link.href)}
                        className={`nav-link ${isServicesActive ? 'active' : ''}`}
                      >
                        <span>{link.label}</span>
                        <span
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setServicesDropdownOpen((prev) => !prev);
                          }}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            padding: '2px 0',
                          }}
                          aria-label="Toggle practice areas menu"
                        >
                          <ChevronDown
                            size={14}
                            style={{
                              transition: 'transform 0.16s ease',
                              transform: servicesDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                              opacity: 0.7,
                            }}
                          />
                        </span>
                      </Link>
                    </div>

                    {/* Services Dropdown Menu */}
                    {servicesDropdownOpen && (
                      <div className="nav-dropdown-menu">
                        <div style={{ padding: '6px 12px 8px', borderBottom: '1px solid var(--border-subtle)', marginBottom: 4 }}>
                          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-teal)', fontFamily: 'var(--font-mono)' }}>
                            Practice Areas
                          </span>
                        </div>

                        {activeServices.map((srv) => (
                          <Link
                            key={srv.id}
                            href={`/services/${srv.slug}`}
                            prefetch={true}
                            onPointerEnter={() => handlePointerEnterOrDown(`/services/${srv.slug}`)}
                            onPointerDown={() => handlePointerEnterOrDown(`/services/${srv.slug}`)}
                            onClick={() => handleLinkClick(`/services/${srv.slug}`)}
                            className={`nav-dropdown-item ${effectivePath === `/services/${srv.slug}` ? 'active' : ''}`}
                          >
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <span style={{ fontWeight: 600, color: effectivePath === `/services/${srv.slug}` ? 'var(--accent-teal)' : '#ffffff' }}>
                                {srv.title}
                              </span>
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>
                                {srv.shortDescription ? srv.shortDescription.slice(0, 52) + '...' : 'Specialized advisory practice'}
                              </span>
                            </div>
                            <ArrowUpRight size={14} style={{ opacity: 0.5, flexShrink: 0, marginLeft: 8 }} />
                          </Link>
                        ))}

                        <div style={{ borderTop: '1px solid var(--border-subtle)', marginTop: 4, paddingTop: 4 }}>
                          <Link
                            href="/services"
                            prefetch={true}
                            onPointerEnter={() => handlePointerEnterOrDown('/services')}
                            onPointerDown={() => handlePointerEnterOrDown('/services')}
                            onClick={() => handleLinkClick('/services')}
                            className="nav-dropdown-item"
                            style={{ color: 'var(--accent-teal)', fontWeight: 600, fontSize: '0.825rem' }}
                          >
                            <span>View All Services & Practices</span>
                            <ArrowUpRight size={14} />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = effectivePath === link.href || (link.href !== '/' && effectivePath.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={true}
                  onPointerEnter={() => handlePointerEnterOrDown(link.href)}
                  onPointerDown={() => handlePointerEnterOrDown(link.href)}
                  onClick={link.href === '/' ? handleHomeClick : () => handleLinkClick(link.href)}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="desktop-nav" style={{ gap: 14 }}>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn btn-primary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', touchAction: 'manipulation' }}
            >
              {settings.heroCtaText || 'Book Consultation'}
              <ArrowUpRight size={15} />
            </button>
          </div>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="mobile-toggle"
            style={{
              padding: 8,
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#ffffff',
              cursor: 'pointer',
              border: '1px solid var(--border-subtle)',
            }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              padding: '16px 20px 24px',
              background: '#12151c',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              animation: 'slideUp 0.16s ease-out',
            }}
          >
            {navLinks.map((link) => {
              const isActive = effectivePath === link.href || (link.href !== '/' && effectivePath.startsWith(link.href));
              return (
                <div key={link.href}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderRadius: 'var(--radius-md)',
                      background: isActive ? 'rgba(20, 243, 193, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                      transition: 'all 0.12s ease',
                    }}
                  >
                    <Link
                      href={link.href}
                      prefetch={true}
                      onPointerDown={() => handlePointerEnterOrDown(link.href)}
                      onClick={(e) => {
                        if (link.href === '/') handleHomeClick(e);
                        else handleLinkClick(link.href);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 14px',
                        flex: 1,
                        color: isActive ? 'var(--accent-teal)' : '#ffffff',
                        fontWeight: 600,
                        textDecoration: 'none',
                      }}
                    >
                      <span>{link.label}</span>
                      {!link.hasDropdown && <ArrowUpRight size={15} style={{ opacity: 0.6 }} />}
                    </Link>

                    {link.hasDropdown && (
                      <button
                        type="button"
                        onClick={() => setMobileServicesExpanded((prev) => !prev)}
                        style={{
                          padding: '12px 16px',
                          color: 'var(--text-secondary)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                        aria-label="Expand services"
                      >
                        <ChevronDown
                          size={16}
                          style={{
                            transition: 'transform 0.16s ease',
                            transform: mobileServicesExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                          }}
                        />
                      </button>
                    )}
                  </div>

                  {/* Sub-services on mobile */}
                  {link.hasDropdown && mobileServicesExpanded && (
                    <div style={{ paddingLeft: 14, margin: '6px 0 10px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {activeServices.map((srv) => (
                        <Link
                          key={srv.id}
                          href={`/services/${srv.slug}`}
                          prefetch={true}
                          onPointerDown={() => handlePointerEnterOrDown(`/services/${srv.slug}`)}
                          onClick={() => handleLinkClick(`/services/${srv.slug}`)}
                          style={{
                            padding: '8px 12px',
                            borderRadius: 'var(--radius-sm)',
                            color: effectivePath === `/services/${srv.slug}` ? 'var(--accent-teal)' : 'var(--text-secondary)',
                            fontSize: '0.85rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            textDecoration: 'none',
                          }}
                        >
                          <span>• {srv.title}</span>
                          <ArrowUpRight size={13} style={{ opacity: 0.4 }} />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div style={{ height: 1, background: 'var(--border-subtle)', margin: '10px 0' }} />

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsModalOpen(true);
              }}
              className="btn btn-teal"
              style={{ width: '100%', padding: '12px', justifyContent: 'center', fontWeight: 600, touchAction: 'manipulation' }}
            >
              {settings.heroCtaText || 'Book Consultation'}
              <ArrowUpRight size={16} />
            </button>
          </div>
        )}
      </header>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        services={services}
      />
    </>
  );
}
