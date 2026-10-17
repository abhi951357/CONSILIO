import React from 'react';
import { getSettings, getServices, getFAQs } from '@/lib/db';
import { Navbar } from '@/components/Navbar';
import { ServicesSection } from '@/components/ServicesSection';
import { FaqSection } from '@/components/FaqSection';
import { CtaBanner } from '@/components/CtaBanner';
import { Footer } from '@/components/Footer';

export const dynamic = 'force-dynamic';

export default async function ServicesPage() {
  const settings = getSettings();
  const services = getServices();
  const faqs = getFAQs();

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar settings={settings} services={services} />

      {/* Services Header */}
      <section style={{ padding: '80px 0 30px', textAlign: 'center', position: 'relative' }}>
        <div className="container-narrow">
          <div className="pill-badge" style={{ marginBottom: 16 }}>
            <span className="pill-dot"></span>
            Comprehensive Advisory
          </div>
          <h1 className="heading-display" style={{ marginBottom: 20 }}>
            Expert Solutions Built For Enterprise Impact
          </h1>
          <p className="text-lead" style={{ maxWidth: 700, margin: '0 auto' }}>
            We provide strategic, operational, and financial advisory services designed to solve high-stakes challenges, eliminate organizational friction, and accelerate sustainable commercial growth.
          </p>
        </div>
      </section>

      <ServicesSection
        services={services}
        title="Our Advisory Practices"
        subtitle="Explore each specialized pillar to understand how we partner with leadership teams to achieve measurable outcomes."
        showFilters={true}
      />

      <FaqSection faqs={faqs} />
      <CtaBanner settings={settings} services={services} />
      <Footer settings={settings} services={services} />
    </main>
  );
}
