import React from 'react';
import { Check, X, ShieldAlert, Sparkles } from 'lucide-react';

export function ComparisonSection() {
  const comparisons = [
    {
      feature: 'Strategic Customization',
      otherFirms: 'Generic boilerplate templates with minimal industry adaptation',
      withUs: 'Bespoke growth architectures engineered for your specific unit economics',
    },
    {
      feature: 'Deliverable Usability',
      otherFirms: '150-page theoretical slides that sit in executive inboxes',
      withUs: 'Clear 30/60/90-day execution playbooks teams can execute on Day 1',
    },
    {
      feature: 'Execution Accountability',
      otherFirms: 'Advisors vanish as soon as the final invoice is cleared',
      withUs: 'Weekly embedded operating reviews and hands-on implementation steering',
    },
    {
      feature: 'Success Measurement',
      otherFirms: 'Success measured by billable hours and slides delivered',
      withUs: 'Performance evaluated on real net revenue, margin, and efficiency outcomes',
    },
    {
      feature: 'Root Cause Resolution',
      otherFirms: 'Band-aid advice addressing symptoms instead of systemic issues',
      withUs: 'Deep operational surgery eliminating bottlenecks at the institutional source',
    },
  ];

  return (
    <section className="section-light" style={{ padding: '100px 0' }}>
      <div className="container">
        <div style={{ maxWidth: 760, margin: '0 auto 60px', textAlign: 'center' }}>
          <div className="pill-badge" style={{ marginBottom: 16 }}>
            <span className="pill-dot"></span>
            The Difference
          </div>
          <h2 className="heading-1" style={{ marginBottom: 16 }}>
            Why High-Growth Companies Choose Consilio
          </h2>
          <p className="text-lead" style={{ fontSize: '1.05rem' }}>
            Many consulting engagements deliver thick binder recommendations that fall short during implementation. We combine high-level executive strategy with hands-on operational discipline.
          </p>
        </div>

        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <table className="comparison-table" style={{ minWidth: 640 }}>
            <thead>
              <tr>
                <th style={{ width: '25%' }}>Capability / Dimension</th>
                <th style={{ width: '37.5%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#ef4444' }}>
                    <X size={16} />
                    Traditional Consulting Firms
                  </div>
                </th>
                <th className="highlight-col" style={{ width: '37.5%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Check size={16} color="var(--accent-teal)" />
                    With Consilio®
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((item, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 600, color: '#0c111c' }}>
                    {item.feature}
                  </td>
                  <td style={{ color: 'var(--text-light-secondary)', lineHeight: 1.5 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <span style={{ color: '#ef4444', flexShrink: 0, marginTop: 2 }}>✕</span>
                      <span>{item.otherFirms}</span>
                    </div>
                  </td>
                  <td className="highlight-col" style={{ color: '#0c111c', lineHeight: 1.5, background: 'rgba(20, 243, 193, 0.08)' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <span style={{ color: 'var(--accent-teal-dark)', flexShrink: 0, marginTop: 2, fontWeight: 700 }}>✓</span>
                      <span>{item.withUs}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
