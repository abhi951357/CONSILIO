import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, User, Tag, ArrowUpRight } from 'lucide-react';
import { getSettings, getServices, getBlogs, getBlogBySlug } from '@/lib/db';
import { Navbar } from '@/components/Navbar';
import { CtaBanner } from '@/components/CtaBanner';
import { Footer } from '@/components/Footer';

export const dynamic = 'force-dynamic';

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  const settings = getSettings();
  const allServices = getServices();
  const allBlogs = getBlogs(true);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = allBlogs.filter((b) => b.id !== blog.id).slice(0, 2);

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar settings={settings} services={allServices} />

      {/* Article Header */}
      <section style={{ padding: '80px 0 40px', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container-narrow">
          <Link
            href="/blogs"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              color: 'var(--text-secondary)',
              fontSize: '0.875rem',
              marginBottom: 24,
            }}
          >
            <ArrowLeft size={16} />
            Back to all insights
          </Link>

          <div className="pill-badge" style={{ marginBottom: 16 }}>
            <span className="pill-dot"></span>
            {blog.category}
          </div>

          <h1 className="heading-display" style={{ marginBottom: 20, fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)' }}>
            {blog.title}
          </h1>

          <p className="text-lead" style={{ marginBottom: 32, color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
            {blog.excerpt}
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 20,
              padding: '16px 20px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: 'var(--accent-teal)',
                  color: '#0c0e12',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {blog.author[0]}
              </div>
              <span style={{ color: '#ffffff', fontWeight: 600 }}>{blog.author}</span>
              <span className="text-muted">({blog.authorRole})</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Calendar size={14} color="var(--accent-teal)" />
              <span>{blog.publishedDate}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Clock size={14} color="var(--accent-teal)" />
              <span>{blog.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section style={{ padding: '60px 0 90px' }}>
        <div className="container-narrow">
          <article
            style={{
              fontSize: '1.1rem',
              lineHeight: 1.85,
              color: 'var(--text-primary)',
            }}
          >
            {blog.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3
                    key={idx}
                    className="heading-2"
                    style={{
                      fontSize: '1.6rem',
                      marginTop: 40,
                      marginBottom: 16,
                      color: '#ffffff',
                    }}
                  >
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              return (
                <p key={idx} style={{ marginBottom: 24, color: 'var(--text-secondary)' }}>
                  {paragraph}
                </p>
              );
            })}
          </article>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginTop: 40,
                paddingTop: 24,
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              <Tag size={16} color="var(--accent-teal)" />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Tags:</span>
              {blog.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  style={{
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    fontSize: '0.8rem',
                    color: '#ffffff',
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Related Insights */}
      {relatedBlogs.length > 0 && (
        <section style={{ padding: '70px 0', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)' }}>
          <div className="container">
            <h3 className="heading-2" style={{ marginBottom: 28, color: '#ffffff' }}>
              Explore More Executive Perspectives
            </h3>
            <div className="grid-2">
              {relatedBlogs.map((other) => (
                <Link key={other.id} href={`/blogs/${other.slug}`} className="card-editorial">
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-teal)', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>
                    {other.category} • {other.readTime}
                  </span>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: 10 }}>
                    {other.title}
                  </h4>
                  <p className="text-secondary" style={{ fontSize: '0.9rem', marginBottom: 16 }}>
                    {other.excerpt}
                  </p>
                  <span style={{ color: 'var(--accent-teal)', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', fontWeight: 600 }}>
                    Read article &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner settings={settings} services={allServices} />
      <Footer settings={settings} services={allServices} />
    </main>
  );
}
