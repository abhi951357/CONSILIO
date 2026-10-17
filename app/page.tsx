import React from 'react';
import { getSettings, getServices, getBlogs, getTestimonials, getFAQs } from '@/lib/db';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { AboutSection } from '@/components/AboutSection';
import { ServicesSection } from '@/components/ServicesSection';
import { ApproachSection } from '@/components/ApproachSection';
import { ComparisonSection } from '@/components/ComparisonSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { BlogsSection } from '@/components/BlogsSection';
import { FaqSection } from '@/components/FaqSection';
import { CtaBanner } from '@/components/CtaBanner';
import { Footer } from '@/components/Footer';

// Revalidate immediately on change
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const settings = getSettings();
  const services = getServices();
  const blogs = getBlogs(true);
  const testimonials = getTestimonials();
  const faqs = getFAQs();

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar settings={settings} services={services} />

      <Hero settings={settings} services={services} />

      <AboutSection />

      <ServicesSection
        services={services}
        title="Expert Guidance For Every Stage Of Growth"
        subtitle="Strategic services designed to solve challenges, improve performance & accelerate growth."
        showFilters={false}
      />

      <ApproachSection />

      <ComparisonSection />

      <TestimonialsSection testimonials={testimonials} />

      <BlogsSection blogs={blogs} limit={3} />

      <FaqSection faqs={faqs} />

      <CtaBanner settings={settings} services={services} />

      <Footer settings={settings} services={services} />
    </main>
  );
}
