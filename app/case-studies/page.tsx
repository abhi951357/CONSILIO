import React from 'react';
import { getSettings, getServices, getCaseStudies } from '@/lib/db';
import { Navbar } from '@/components/Navbar';
import { CaseStudiesSection } from '@/components/CaseStudiesSection';
import { CtaBanner } from '@/components/CtaBanner';
import { Footer } from '@/components/Footer';

export const dynamic = 'force-dynamic';

export default async function CaseStudiesPage() {
  const settings = getSettings();
  const services = getServices();
  const caseStudies = getCaseStudies();

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar settings={settings} services={services} />

      {/* Header */}
      <section style={{ padding: '80px 0 20px', textAlign: 'center', position: 'relative' }}>
        <div className="container-narrow">
          <div className="pill-badge" style={{ marginBottom: 16 }}>
            <span className="pill-dot"></span>
            Proven Client Impact
          </div>
          <h1 className="heading-display" style={{ marginBottom: 20 }}>
            Success Stories & Business Transformations
          </h1>
          <p className="text-lead" style={{ maxWidth: 700, margin: '0 auto' }}>
            Explore in-depth case studies demonstrating how practical strategy, operational discipline, and executive alignment generated measurable commercial breakthroughs.
          </p>
        </div>
      </section>

      <CaseStudiesSection
        caseStudies={caseStudies}
        title="Client Engagement Archive"
        subtitle="Detailed reviews of real strategic partnerships and quantifiable growth metrics achieved across multiple industries."
      />

      <CtaBanner settings={settings} services={services} />
      <Footer settings={settings} services={services} />
    </main>
  );
}
