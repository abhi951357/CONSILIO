'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Clock } from 'lucide-react';
import { BlogPost } from '@/types';

interface BlogsSectionProps {
  blogs: BlogPost[];
  title?: string;
  subtitle?: string;
  limit?: number;
}

const cardThemes = [
  {
    className: 'themed-blog-card-teal',
    bg: 'linear-gradient(155deg, #131c22 0%, #0c1117 100%)',
    border: '1px solid rgba(20, 243, 193, 0.25)',
    shadow: '0 8px 24px rgba(12, 14, 18, 0.15)',
    badgeBg: 'rgba(20, 243, 193, 0.12)',
    badgeBorder: 'rgba(20, 243, 193, 0.35)',
    badgeColor: '#14f3c1',
    accentColor: '#14f3c1',
    dividerColor: 'rgba(255, 255, 255, 0.1)',
  },
  {
    className: 'themed-blog-card-blue',
    bg: 'linear-gradient(155deg, #12192c 0%, #0b0f1c 100%)',
    border: '1px solid rgba(56, 189, 248, 0.25)',
    shadow: '0 8px 24px rgba(12, 14, 18, 0.15)',
    badgeBg: 'rgba(56, 189, 248, 0.12)',
    badgeBorder: 'rgba(56, 189, 248, 0.35)',
    badgeColor: '#38bdf8',
    accentColor: '#38bdf8',
    dividerColor: 'rgba(255, 255, 255, 0.1)',
  },
  {
    className: 'themed-blog-card-purple',
    bg: 'linear-gradient(155deg, #19142a 0%, #0f0d1c 100%)',
    border: '1px solid rgba(167, 139, 250, 0.25)',
    shadow: '0 8px 24px rgba(12, 14, 18, 0.15)',
    badgeBg: 'rgba(167, 139, 250, 0.12)',
    badgeBorder: 'rgba(167, 139, 250, 0.35)',
    badgeColor: '#a78bfa',
    accentColor: '#a78bfa',
    dividerColor: 'rgba(255, 255, 255, 0.1)',
  },
];

export function BlogsSection({
  blogs,
  title = 'Latest Industry News & Insights',
  subtitle = 'Explore expert insights and news on consulting, business growth, and market movements.',
  limit,
}: BlogsSectionProps) {
  const displayBlogs = limit ? blogs.slice(0, limit) : blogs;

  return (
    <section
      id="blogs-section"
      className="section-light"
      style={{
        padding: '90px 0',
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e5e7eb',
        borderBottom: '1px solid #e5e7eb',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 20,
            marginBottom: 50,
          }}
        >
          <div style={{ maxWidth: 680 }}>
            <div className="pill-badge" style={{ marginBottom: 16 }}>
              <span className="pill-dot" style={{ backgroundColor: '#056671' }}></span>
              News & Insights
            </div>
            <h2 className="heading-1" style={{ marginBottom: 12, color: '#0c111c' }}>
              {title}
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#4b5563', lineHeight: 1.6 }}>
              {subtitle}
            </p>
          </div>

          <Link
            href="/blogs"
            className="btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 20px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid #d1d5db',
              background: '#ffffff',
              color: '#0c111c',
              fontWeight: 600,
              fontSize: '0.875rem',
              transition: 'var(--transition)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            View All Articles
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid-3" style={{ gap: 24 }}>
          {displayBlogs.map((post, index) => {
            const theme = cardThemes[index % cardThemes.length];

            return (
              <Link
                key={post.id}
                href={`/blogs/${post.slug}`}
                className={`themed-blog-card ${theme.className}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  background: theme.bg,
                  border: theme.border,
                  borderRadius: '16px',
                  padding: '30px',
                  boxShadow: theme.shadow,
                  textDecoration: 'none',
                }}
              >
                {/* Category & Read Time */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                  <span
                    style={{
                      padding: '4px 12px',
                      borderRadius: 'var(--radius-full)',
                      background: theme.badgeBg,
                      color: theme.badgeColor,
                      border: `1px solid ${theme.badgeBorder}`,
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      fontFamily: 'var(--font-mono)',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {post.category}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.8rem' }}>
                    <Clock size={13} />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Article Title */}
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    marginBottom: 12,
                    color: '#ffffff',
                    lineHeight: 1.35,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p style={{ fontSize: '0.925rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.78)', marginBottom: 26, flex: 1 }}>
                  {post.excerpt}
                </p>

                {/* Footer / Meta */}
                <div
                  style={{
                    borderTop: `1px solid ${theme.dividerColor}`,
                    paddingTop: 18,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.85rem',
                  }}
                >
                  <div>
                    <span style={{ color: '#ffffff', fontWeight: 600, display: 'block' }}>
                      {post.author}
                    </span>
                    <span style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.75rem' }}>
                      {post.publishedDate}
                    </span>
                  </div>

                  <span style={{ color: theme.accentColor, display: 'flex', alignItems: 'center', gap: 4, fontWeight: 700 }}>
                    Read <ArrowUpRight size={14} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
