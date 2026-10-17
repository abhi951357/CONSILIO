import React from 'react';
import { getSettings, getServices, getBlogs } from '@/lib/db';
import { Navbar } from '@/components/Navbar';
import { BlogsSection } from '@/components/BlogsSection';
import { CtaBanner } from '@/components/CtaBanner';
import { Footer } from '@/components/Footer';

export const dynamic = 'force-dynamic';

export default async function BlogsPage() {
  const settings = getSettings();
  const services = getServices();
  const blogs = getBlogs(true);

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar settings={settings} services={services} />

      {/* Header */}
      <section style={{ padding: '80px 0 20px', textAlign: 'center', position: 'relative' }}>
        <div className="container-narrow">
          <div className="pill-badge" style={{ marginBottom: 16 }}>
            <span className="pill-dot"></span>
            Executive Insights
          </div>
          <h1 className="heading-display" style={{ marginBottom: 20 }}>
            News, Strategic Research & Insights
          </h1>
          <p className="text-lead" style={{ maxWidth: 700, margin: '0 auto' }}>
            Practical analysis, frameworks, and actionable perspectives on leadership, operational efficiency, and commercial growth.
          </p>
        </div>
      </section>

      <BlogsSection
        blogs={blogs}
        title="All Published Articles"
        subtitle="Curated perspectives from our senior consulting partners and industry analysts."
      />

      <CtaBanner settings={settings} services={services} />
      <Footer settings={settings} services={services} />
    </main>
  );
}
