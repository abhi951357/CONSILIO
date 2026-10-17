import { DatabaseSchema } from '@/types';
import { hashPassword } from './auth';

export function getDefaultDatabase(): DatabaseSchema {
  return {
    settings: {
      siteTitle: 'Consilio — Executive Consulting & Strategic Advisory',
      tagline: 'Partner with consultants committed to achieving measurable business results.',
      brandName: 'Consilio®',
      description: 'A clean, modern consulting & business platform for ambitious teams, high-growth startups, and established enterprises.',
      contactEmail: 'contact@consilio.com',
      phone: '+1 (800) 247-9812',
      hours: 'Available 24/7 for Enterprise Enquiries',
      address: '742 Evergreen Terrace, Suite 500, Austin, TX 78701',
      facebookUrl: 'https://facebook.com',
      linkedinUrl: 'https://linkedin.com',
      twitterUrl: 'https://twitter.com',
      instagramUrl: 'https://instagram.com',
      heroBadge: 'Strategic Advisory & Enterprise Growth',
      heroTitle: 'Unlocking growth through expertise',
      heroSubtitle: 'Consilio partners with ambitious teams to simplify complexity, strengthen decision-making & create sustainable growth through strategic expertise.',
      heroCtaText: 'Book Consultation',
      heroCtaLink: '#book-consultation',
      heroStats: [
        { value: '175+', label: 'Businesses Advised' },
        { value: '12+', label: 'Years of Experience' },
        { value: '98%', label: 'Client Satisfaction' },
        { value: '25+', label: 'Industry Specialists' },
      ],
      announcementText: '',
      announcementEnabled: false,
      ctaBannerTitle: 'Build clarity. Unlock growth.',
      ctaBannerSubtitle: 'Book a consultation and get a clear view of what’s driving your business — so you can act faster.',
      ctaBannerButtonText: 'Book Consultation',
    },
    services: [
      {
        id: 'srv-1',
        slug: 'growth-consulting',
        title: 'Growth Consulting',
        category: 'Strategy & Growth',
        iconName: 'TrendingUp',
        shortDescription: 'Identify opportunities, overcome barriers & implement strategies for growth.',
        fullOverview: 'Sustainable growth doesn’t happen by chance—it requires a clear vision, strategic planning, and disciplined execution. At Consilio, our Growth Consulting services help organizations identify new opportunities, overcome business challenges, and build scalable strategies that support long-term success.',
        deliverables: [
          'Business growth planning & scalability roadmap',
          'Revenue optimization & pricing architecture',
          'Market opportunity analysis & TAM expansion',
          'Customer growth strategies & retention funnels',
          'Business model evaluation & unit economics',
          'Strategic planning workshops for executive teams',
        ],
        approach: [
          {
            step: '01',
            title: 'Diagnostic & Growth Audit',
            description: 'Evaluate business performance, unit economics, market positioning, and operational ceilings.',
          },
          {
            step: '02',
            title: 'Opportunity Architecture',
            description: 'Design prioritized growth levers with high ROI, quantified risks, and timeline milestones.',
          },
          {
            step: '03',
            title: 'Execution & Momentum',
            description: 'Collaborate with leadership to implement changes, monitor velocity, and refine in real-time.',
          },
        ],
        metrics: [
          { value: '+48%', label: 'Avg. Revenue Velocity' },
          { value: '3.4x', label: 'LTV to CAC Ratio' },
        ],
        featured: true,
        order: 1,
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'srv-2',
        slug: 'financial-advisory',
        title: 'Financial Advisory',
        category: 'Finance & Capital',
        iconName: 'DollarSign',
        shortDescription: 'Improve profitability, optimize financial performance, and make informed decisions.',
        fullOverview: 'Financial success depends on making informed decisions supported by accurate analysis and long-term planning. Consilio provides strategic financial advisory services that help organizations improve profitability, manage risk, optimize investments, and strengthen overall financial performance.',
        deliverables: [
          'Financial planning & advanced sensitivity modeling',
          'Budget optimization & capital allocation strategy',
          'Profitability analysis across business units & products',
          'Cost reduction & margin expansion frameworks',
          'Investment evaluation & M&A readiness advisory',
          'Continuous executive cash flow visibility & KPIs',
        ],
        approach: [
          {
            step: '01',
            title: 'Financial Baseline Assessment',
            description: 'Deep dive into historical cash flows, cost drivers, overhead ratios, and working capital cycle.',
          },
          {
            step: '02',
            title: 'Restructuring & Optimization',
            description: 'Identify leakage, renegotiate vendor contracts, streamline tax and debt structures.',
          },
          {
            step: '03',
            title: 'Predictive Financial Governance',
            description: 'Deploy real-time reporting dashboards and quarterly review cadences for leadership.',
          },
        ],
        metrics: [
          { value: '+28%', label: 'Profit Margin Lift' },
          { value: '-22%', label: 'Operating Cost Reduction' },
        ],
        featured: true,
        order: 2,
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'srv-3',
        slug: 'business-strategy',
        title: 'Business Strategy',
        category: 'Strategy & Growth',
        iconName: 'Compass',
        shortDescription: 'Build clear roadmaps, align priorities & create actionable plans that support growth.',
        fullOverview: 'A successful business begins with a clear strategy. At Consilio, we help organizations define their direction, establish meaningful objectives, and develop practical plans that support sustainable growth in an increasingly competitive marketplace.',
        deliverables: [
          'Corporate strategy development & 3-year master plan',
          'Comprehensive business model transformation',
          'Competitive positioning & moats establishment',
          'Organizational alignment & OKRs cascading',
          'Performance review & executive governance model',
          'Facilitated executive alignment offsites',
        ],
        approach: [
          {
            step: '01',
            title: 'Strategic Synthesis',
            description: 'Benchmark industry headwinds, competitive vectors, and organizational competencies.',
          },
          {
            step: '02',
            title: 'Roadmap Blueprinting',
            description: 'Translate lofty corporate visions into actionable, departmental quarterly execution milestones.',
          },
          {
            step: '03',
            title: 'Alignment & Governance',
            description: 'Align senior leadership around unified metrics to prevent operational friction.',
          },
        ],
        metrics: [
          { value: '100%', label: 'Executive Goal Alignment' },
          { value: '2.5x', label: 'Strategy Execution Speed' },
        ],
        featured: true,
        order: 3,
        updatedAt: new Date().toISOString(),
      },
    ],
    caseStudies: [
      {
        id: 'cs-1',
        slug: 'vertex-digital',
        title: 'Accelerating Technology Company Expansion With Executive Strategy And Market Positioning',
        client: 'Vertex Digital',
        industry: 'Technology & SaaS',
        serviceCategory: 'Strategic Advisory',
        location: 'Austin, Texas',
        summary: 'Vertex Digital Solutions planned to expand into new markets but required a clearer strategic direction to scale effectively without sacrificing operational stability.',
        challenge: 'Rapid growth created competing priorities across departments, making it difficult to execute strategic initiatives consistently. Leadership lacked a unified framework for evaluating opportunities and allocating resources.',
        approach: 'We facilitated executive planning sessions, assessed market opportunities, and developed a phased growth roadmap aligned with organizational capabilities. Key performance metrics were introduced to track execution.',
        outcome: 'The company successfully entered new markets while increasing enterprise revenue and strengthening organizational alignment. Decision-making became faster and backed by hard data.',
        keyMetric: '+48%',
        metricLabel: 'Annual Enterprise Revenue',
        metrics: [
          { value: '+48%', label: 'Annual Revenue' },
          { value: '+29%', label: 'Enterprise Clients' },
          { value: '+24%', label: 'Market Expansion' },
        ],
        clientQuote: 'Consilio delivered the clarity, structure, and strategic discipline our leadership team needed to confidently scale the business into new markets.',
        clientAuthor: 'Olivia Brooks',
        clientRole: 'Co-Founder & CEO, Vertex Digital',
        featured: true,
        order: 1,
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'cs-2',
        slug: 'horizon-retail-co',
        title: 'Driving Sustainable Retail Growth With Data-Led Business Strategy And Planning',
        client: 'Horizon Retail Co.',
        industry: 'Omnichannel Retail',
        serviceCategory: 'Growth Strategy',
        location: 'Denver, Colorado',
        summary: 'Horizon Retail had experienced rapid expansion but struggled to maintain consistent customer engagement across its physical and digital channels.',
        challenge: 'Customer retention had begun to decline despite increasing marketing investment. Teams worked independently, resulting in fragmented messaging and unclear inventory priorities.',
        approach: 'We analyzed end-to-end customer behavior, redesigned omni-channel incentives, and established unified strategic roadmaps with weekly cross-departmental dashboards.',
        outcome: 'Within twelve months, customer retention and repeat purchases surged, while team collaboration centered on shared commercial outcomes.',
        keyMetric: '+36%',
        metricLabel: 'Customer Retention Lift',
        metrics: [
          { value: '+36%', label: 'Customer Retention' },
          { value: '+29%', label: 'Revenue Growth' },
          { value: '+41%', label: 'Repeat Purchases' },
        ],
        clientQuote: 'Consilio helped us replace assumptions with strategy, creating measurable improvements that strengthened customer loyalty and accelerated sustainable business growth.',
        clientAuthor: 'Ryan Mercer',
        clientRole: 'Co-Founder & COO, Horizon Retail',
        featured: true,
        order: 2,
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'cs-3',
        slug: 'northbridge',
        title: 'Helping A Financial Firm Improve Profitability Through Strategic Business Planning',
        client: 'Northbridge Financial Group',
        industry: 'Financial Services',
        serviceCategory: 'Strategy & Advisory',
        location: 'Austin, Texas',
        summary: 'Northbridge Financial sought to improve profitability while adapting to increasing competition and evolving institutional client expectations.',
        challenge: 'The company struggled with inconsistent growth, rising operational overhead, and limited visibility into divisional profitability.',
        approach: 'Consilio developed a practical business roadmap focused on operational efficiency, client onboarding revamp, and redesigned financial planning processes.',
        outcome: 'Revenue grew steadily while operational expenses declined significantly through streamlined workflows and disciplined financial oversight.',
        keyMetric: '+28%',
        metricLabel: 'Net Revenue Growth',
        metrics: [
          { value: '+28%', label: 'Revenue Growth' },
          { value: '+24%', label: 'Client Retention' },
          { value: '-22%', label: 'Operating Costs' },
        ],
        clientQuote: 'Consilio delivered strategic clarity, practical recommendations, and measurable outcomes that significantly improved our profitability and executive decision-making confidence.',
        clientAuthor: 'Marcus Dean',
        clientRole: 'Managing Partner, Northbridge Financial',
        featured: true,
        order: 3,
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'cs-4',
        slug: 'apex-industrial',
        title: 'How We Helped A Manufacturing Firm Scale Operations Across Three Regions',
        client: 'Apex Industrial',
        industry: 'Advanced Manufacturing',
        serviceCategory: 'Operations Consulting',
        location: 'San Francisco, California',
        summary: 'Apex Industrial Solutions was expanding rapidly across multiple regions but struggled to maintain consistent operational performance across distributed facilities.',
        challenge: 'Each facility operated independently, creating redundant work, inconsistent production metrics, delayed deliveries, and rising operational bottlenecks.',
        approach: 'We conducted full operational assessments across all facilities, deployed standardized Lean workflows, and introduced unified telemetry dashboards.',
        outcome: 'Production downtime decreased substantially while operational efficiency climbed 42% across all three regional plants.',
        keyMetric: '+42%',
        metricLabel: 'Operational Efficiency',
        metrics: [
          { value: '+42%', label: 'Operational Efficiency' },
          { value: '-32%', label: 'Production Downtime' },
          { value: '+18%', label: 'Profit Margin Increase' },
        ],
        clientQuote: 'Consilio transformed fragmented operations into a unified strategy that improved efficiency, strengthened leadership confidence, and supported our nationwide expansion successfully.',
        clientAuthor: 'Jack Posso',
        clientRole: 'Founder & Director, Apex Industrial',
        featured: true,
        order: 4,
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'cs-5',
        slug: 'everwell-network',
        title: 'Transforming A Healthcare Provider Through Operational Excellence And Leadership Alignment',
        client: 'Everwell Network',
        industry: 'Healthcare & Clinical',
        serviceCategory: 'Operational Transformation',
        location: 'Miami, Florida',
        summary: 'Everwell Health Network aimed to improve operational performance while delivering a more consistent patient experience across 14 regional facilities.',
        challenge: 'Administrative bottlenecks burdened clinicians, delayed intake times, and reduced patient satisfaction scores while inflating staffing costs.',
        approach: 'We mapped clinical and administrative workflows, simplified digital intake procedures, and coached clinical leaders on cross-departmental coordination.',
        outcome: 'Administrative delays were reduced by nearly a third, clinician retention stabilized, and patient satisfaction reached all-time record highs.',
        keyMetric: '+37%',
        metricLabel: 'Process Efficiency',
        metrics: [
          { value: '+37%', label: 'Process Efficiency' },
          { value: '-31%', label: 'Administrative Delays' },
          { value: '+24%', label: 'Patient Satisfaction' },
        ],
        clientQuote: 'The structured approach and collaborative partnership helped our leadership team achieve meaningful operational improvements across every department and location.',
        clientAuthor: 'Elena Torres',
        clientRole: 'Co-Founder & VP Operations, Everwell',
        featured: true,
        order: 5,
        updatedAt: new Date().toISOString(),
      },
    ],
    blogs: [
      {
        id: 'blog-1',
        slug: 'improving-operational-efficiency-without-costs-increase',
        title: 'Improving operational efficiency without costs increase',
        excerpt: 'Learn practical ways to streamline operations, eliminate inefficiencies, improve productivity, and maximize business performance without significantly increasing operating expenses.',
        content: `Operational efficiency isn't about working harder—it's about working smarter. Organizations that optimize processes can improve performance, reduce waste, and create greater value using existing resources.

Many businesses assume improving efficiency requires major investments in technology or additional staff. In reality, meaningful improvements often come from simplifying workflows and eliminating unnecessary complexity.

By reviewing existing processes and empowering teams to identify opportunities, organizations can increase productivity while maintaining high-quality service.

### 1. Review Existing Processes
Every organization develops processes over time. As businesses grow, workflows often become more complicated than necessary. Tasks may be duplicated, approvals become excessive, and manual activities consume valuable time. Regular process reviews help identify unnecessary steps while creating opportunities to simplify operations without affecting service quality.

### 2. Eliminate Bottlenecks
Operational delays frequently occur because responsibilities are unclear or decisions require too many approvals. Mapping business processes allows leadership to identify where work slows down and implement practical improvements that keep projects moving efficiently. Removing bottlenecks benefits both employees and customers.

### 3. Improve Communication
Poor communication creates unnecessary delays. Teams work more effectively when expectations are clear, information is accessible, and responsibilities are well defined. Regular meetings, standardized reporting, and transparent decision-making improve collaboration throughout the organization.

### 4. Measure Operational Performance
Organizations cannot improve what they don't measure. Tracking meaningful operational metrics provides valuable insight into productivity, efficiency, and service quality. Leaders can identify trends early and make informed adjustments before small issues become significant challenges.

### Conclusion
Operational excellence isn't achieved through one major initiative. It results from regularly reviewing processes, improving communication, measuring performance, and continuously refining how work gets done.`,
        category: 'Operations',
        author: 'Elena Voss',
        authorRole: 'Head of Operations',
        readTime: '5 min read',
        publishedDate: 'Sep 7, 2026',
        published: true,
        featured: true,
        tags: ['Operations', 'Productivity', 'Efficiency'],
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'blog-2',
        slug: 'making-better-decisions-with-business-data',
        title: 'Making better decisions with your business data',
        excerpt: 'Understand how data-driven decision-making improves business performance, strengthens strategic planning, and helps organizations respond confidently to changing market conditions.',
        content: `Reliable data helps organizations reduce uncertainty, identify opportunities, and make informed decisions. Businesses that embrace meaningful insights consistently outperform those relying on assumptions alone.

Data has become one of the most valuable business assets. However, collecting information isn't enough—organizations must transform data into practical insights that support better decision-making.

### 1. Focus On Meaningful Metrics
Not every metric deserves equal attention. Organizations should identify key performance indicators that directly reflect their strategic objectives. Tracking too many numbers often creates confusion instead of clarity.

### 2. Improve Strategic Planning
Reliable data strengthens every stage of strategic planning. Historical performance reveals valuable patterns, while current insights help organizations allocate resources more effectively.

### 3. Respond Faster To Change
Markets evolve quickly. Organizations with real-time visibility into business performance can identify challenges before they become larger problems. Timely information enables faster, more confident responses.

### Conclusion
Data only creates value when it leads to action. Continuous learning ensures data remains an active part of decision-making rather than simply another report.`,
        category: 'Business Intelligence',
        author: 'Marcus Hale',
        authorRole: 'Performance Analyst',
        readTime: '6 min read',
        publishedDate: 'Sep 7, 2026',
        published: true,
        featured: true,
        tags: ['Data', 'Analytics', 'Decision Making'],
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'blog-3',
        slug: 'how-strong-leadership-creates-lasting-business-success',
        title: 'How strong leadership creates lasting business success',
        excerpt: 'Explore how effective leadership builds resilient organizations, inspires teams, improves decision-making, and drives long-term business performance through strategic direction.',
        content: `Leadership influences every aspect of an organization. From setting priorities to shaping culture, effective leaders create environments where people, processes, and performance consistently thrive.

Successful organizations aren't built solely on great products or services—they're built on strong leadership. Leaders establish vision, inspire confidence, and guide teams through both opportunities and challenges.

### 1. Establish A Clear Vision
Every successful organization begins with a clear vision. Employees perform with greater confidence when they understand the company's purpose and long-term objectives.

### 2. Build Trust Across Teams
Trust is one of the most valuable assets within any organization. Transparent communication, consistent decision-making, and accountability create stronger relationships between leadership and employees.

### 3. Empower Better Decision-Making
Great leaders don't make every decision themselves. Instead, they build systems that empower managers and teams to make informed decisions within clearly defined objectives.

### Conclusion
Exceptional leadership creates exceptional organizations. Sustainable growth begins with leadership that inspires confidence and drives meaningful action.`,
        category: 'Leadership',
        author: 'Jay Bothroyd',
        authorRole: 'Managing Director',
        readTime: '7 min read',
        publishedDate: 'Jun 6, 2026',
        published: true,
        featured: true,
        tags: ['Leadership', 'Management', 'Culture'],
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'blog-4',
        slug: 'five-strategies-for-sustainable-business-growth',
        title: 'Five strategies for sustainable business growth',
        excerpt: 'Learn five proven strategies that help organizations achieve sustainable growth, improve decision-making, and create long-term competitive advantages.',
        content: `Sustainable growth requires more than ambitious goals. It depends on clear strategy, operational discipline, strong leadership, and the ability to adapt to changing market conditions with confidence.

Growth doesn't happen by chance. Organizations that consistently outperform competitors follow structured strategies that align their people, processes, and objectives around measurable outcomes.

### 1. Define A Clear Strategic Direction
Many organizations struggle because teams pursue different priorities without a unified vision. A clear strategy provides direction, helping leaders allocate resources effectively.

### 2. Build Efficient Operations
As organizations grow, outdated processes often become barriers to productivity. Regularly reviewing operational processes helps identify opportunities to simplify workflows.

### 3. Invest In Leadership Development
Strong businesses depend on strong leadership. Investing in leadership equips managers with the skills needed to guide teams through change.

### 4. Make Decisions Using Reliable Data
Rather than relying on assumptions, successful organizations establish meaningful performance indicators that measure progress toward strategic objectives.

### 5. Create A Culture Of Continuous Improvement
Markets evolve, customer expectations change, and new opportunities emerge regularly. Organizations that encourage continuous learning remain better positioned to adapt.`,
        category: 'Business Strategy',
        author: 'Lucien Moreau',
        authorRole: 'Head of Financial Strategy',
        readTime: '8 min read',
        publishedDate: 'Sep 7, 2024',
        published: true,
        featured: true,
        tags: ['Growth', 'Strategy', 'Scaling'],
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'blog-5',
        slug: 'why-every-business-needs-strategic-planning',
        title: 'Why every business needs strategic planning',
        excerpt: 'Discover how strategic planning improves decision-making, aligns teams, reduces uncertainty, and creates a stronger foundation for sustainable business success.',
        content: `Successful organizations rarely grow by accident. Strategic planning provides the structure needed to align teams, prioritize initiatives, and confidently navigate changing business environments.

Without a clear strategy, businesses often react to immediate challenges instead of preparing for future opportunities. Strategic planning creates alignment across every level of the organization.

### 1. Align The Organization Around Shared Goals
When departments pursue different priorities, progress slows and resources become fragmented. A clear strategy helps every team understand how their work contributes to larger business objectives.

### 2. Prioritize High-Impact Initiatives
Every organization has limited time, budget, and resources. Strategic planning helps leadership identify which opportunities create the greatest value while eliminating distractions.

### 3. Improve Decision-Making
A strategic framework provides context for decisions by defining objectives, acceptable risks, and performance expectations.

### Conclusion
Strategic planning provides more than direction—it creates confidence. Organizations that align their teams and regularly review progress are better positioned for sustainable growth.`,
        category: 'Leadership',
        author: 'Antoine Donka',
        authorRole: 'Head of Sales',
        readTime: '5 min read',
        publishedDate: 'May 4, 2026',
        published: true,
        featured: false,
        tags: ['Planning', 'Executive', 'Roadmap'],
        updatedAt: new Date().toISOString(),
      },
    ],
    team: [
      {
        id: 'tm-1',
        name: 'Jay Bothroyd',
        role: 'Managing Director',
        bio: 'Over 18 years advising Fortune 500 executives on enterprise transformation, corporate strategy, and post-merger integration.',
        order: 1,
      },
      {
        id: 'tm-2',
        name: 'Lucien Moreau',
        role: 'Head of Financial Strategy',
        bio: 'Former senior investment banker specializing in capital allocation, profitability turnarounds, and valuation frameworks.',
        order: 2,
      },
      {
        id: 'tm-3',
        name: 'Elena Voss',
        role: 'Head of Operations',
        bio: 'Specialist in Lean methodologies, complex supply chain resilience, and cross-functional operational restructuring.',
        order: 3,
      },
      {
        id: 'tm-4',
        name: 'Marcus Hale',
        role: 'Performance Analyst',
        bio: 'Pioneers data-driven KPI architecture, executive decision dashboards, and statistical forecasting models.',
        order: 4,
      },
      {
        id: 'tm-5',
        name: 'Joshua Hale',
        role: 'Client Success Lead',
        bio: 'Dedicated to executive relationship management, stakeholder alignment, and project delivery excellence.',
        order: 5,
      },
      {
        id: 'tm-6',
        name: 'Antoine Donka',
        role: 'Head of Sales & Partnerships',
        bio: 'Expert in commercial growth, enterprise partnerships, and client expansion strategies across North America and Europe.',
        order: 6,
      },
    ],
    testimonials: [
      {
        id: 'test-1',
        quote: 'Professional, insightful, and focused on results. The value they delivered exceeded our expectations at every stage of the process.',
        clientName: 'Martha Sherwood',
        clientRole: 'Managing Partner',
        company: 'CNN Firm',
        rating: 5,
        featured: true,
        order: 1,
      },
      {
        id: 'test-2',
        quote: 'The team provided actionable recommendations that immediately improved performance and strengthened our long-term growth strategy.',
        clientName: 'David Jaye',
        clientRole: 'Founder',
        company: 'Procura Firm',
        rating: 5,
        featured: true,
        order: 2,
      },
      {
        id: 'test-3',
        quote: 'Consilio combines financial expertise with practical business insight. Their guidance has been invaluable to our organization since day one.',
        clientName: 'Emilia Barnes',
        clientRole: 'Operations Director',
        company: 'Techno Group',
        rating: 5,
        featured: true,
        order: 3,
      },
      {
        id: 'test-4',
        quote: 'We gained a clearer direction, stronger processes, and a more confident leadership team through our partnership with Consilio.',
        clientName: 'Thomas Welsh',
        clientRole: 'CEO',
        company: 'AIK Logistics',
        rating: 5,
        featured: true,
        order: 4,
      },
    ],
    faqs: [
      {
        id: 'faq-1',
        question: 'Who does Consilio partner with?',
        answer: 'We work with ambitious startups, high-growth mid-market companies, and established enterprise organizations looking to improve strategy, operations, and long-term financial performance. Our solutions are custom-engineered for your stage.',
        category: 'General',
        order: 1,
      },
      {
        id: 'faq-2',
        question: 'What type of services do you provide?',
        answer: 'We provide specialized strategic advisory services across six core pillars: Growth Consulting, Financial Advisory, Corporate Business Strategy, Operational Excellence, Regional & Global Market Expansion, and Executive Leadership Advisory.',
        category: 'Services',
        order: 2,
      },
      {
        id: 'faq-3',
        question: 'How does the consulting process work?',
        answer: 'Every engagement follows our three-phase framework: 1. Discover (diagnostic audit and data gathering), 2. Strategize (collaborative blueprinting and milestone planning), and 3. Execute (hands-on implementation and measurable KPI tracking).',
        category: 'Methodology',
        order: 3,
      },
      {
        id: 'faq-4',
        question: 'What makes Consilio different from traditional firms?',
        answer: 'Unlike traditional firms that deliver 150-page theoretical slide decks and leave, Consilio provides practical, battle-tested execution roadmaps. We work alongside your executives to ensure recommendations convert directly into revenue and operational efficiency.',
        category: 'General',
        order: 4,
      },
      {
        id: 'faq-5',
        question: 'How quickly can we start working with you?',
        answer: 'Following an initial 30-minute discovery consultation, our team can scope the engagement and begin preliminary diagnostic discovery within 5 to 7 business days.',
        category: 'Onboarding',
        order: 5,
      },
      {
        id: 'faq-6',
        question: 'Can you support our executive leadership team through restructuring?',
        answer: 'Yes. Our Leadership Advisory practice specializes in executive alignment, C-suite coaching, change management playbooks, and organizational redesign during rapid growth or restructuring.',
        category: 'Leadership',
        order: 6,
      },
    ],
    customSections: [
      {
        id: 'cs-values',
        key: 'home_values',
        title: 'Principles Behind Our Client Partnerships',
        subtitle: 'Our approach is built on transparency, accountability, and practical thinking—helping businesses make smarter decisions.',
        badge: 'Our Values',
        page: 'home',
        contentJson: JSON.stringify([
          {
            title: 'Strategy',
            desc: 'Every recommendation starts with your goals, ensuring our strategies are tailored to your business & industry.',
          },
          {
            title: 'Leadership',
            desc: 'Our focus extends beyond quick wins, building resilient strategies that strengthen your business.',
          },
          {
            title: 'Partnership',
            desc: 'We work alongside your team, sharing knowledge, solving challenges together & delivering practical solutions.',
          },
          {
            title: 'Innovation',
            desc: 'We combine market insight, financial analysis, and proven frameworks to help you make confident decisions.',
          },
        ]),
        enabled: true,
        order: 1,
      },
      {
        id: 'cs-approach',
        key: 'home_approach',
        title: 'A Proven Framework For Sustainable Growth',
        subtitle: 'Every engagement follows a structured process designed to uncover opportunities, solve critical challenges & create results.',
        badge: 'Our Approach',
        page: 'home',
        contentJson: JSON.stringify([
          {
            step: '01',
            name: 'Discover',
            desc: 'We assess your business, identify operational bottlenecks, evaluate market opportunities, and uncover the highest-impact priorities for sustainable growth.',
          },
          {
            step: '02',
            name: 'Strategize',
            desc: 'Together, we develop practical growth strategies with clear objectives, measurable milestones, financial considerations, and execution plans tailored to your organization.',
          },
          {
            step: '03',
            name: 'Execute',
            desc: 'We support implementation, monitor performance, refine initiatives through real-world insights, and continuously optimize strategies to maximize long-term outcomes.',
          },
        ]),
        enabled: true,
        order: 2,
      },
      {
        id: 'cs-difference',
        key: 'home_difference',
        title: 'Why Businesses Choose Consilio',
        subtitle: 'The Advantage Of Working With Consilio vs Traditional Firms',
        badge: 'The Difference',
        page: 'home',
        contentJson: JSON.stringify([
          {
            feature: 'Strategic Customization',
            otherFirms: 'Generic strategies with limited industry customization',
            withUs: 'Tailored strategies built precisely around your unique business model',
          },
          {
            feature: 'Deliverable Quality',
            otherFirms: 'Lengthy theoretical reports instead of practical action plans',
            withUs: 'Crisp recommendations your team can execute immediately',
          },
          {
            feature: 'Post-Delivery Support',
            otherFirms: 'Zero involvement after final presentation handover',
            withUs: 'Ongoing advisory support & weekly progress reviews beyond launch',
          },
          {
            feature: 'Success Metrics',
            otherFirms: 'Success measured by page count of deliverables',
            withUs: 'Performance measured through hard commercial & operational outcomes',
          },
          {
            feature: 'Root Cause Resolution',
            otherFirms: 'Reactive advice that addresses symptoms, not causes',
            withUs: 'Long-term partnership focused on eliminating root systemic bottlenecks',
          },
        ]),
        enabled: true,
        order: 3,
      },
    ],
    leads: [
      {
        id: 'lead-1',
        name: 'Samantha Wright',
        email: 'swright@aurora-tech.io',
        company: 'Aurora Technologies',
        phone: '+1 (512) 890-2134',
        serviceNeeded: 'growth-consulting',
        message: 'Looking for strategic advisory to support our Series B expansion into European markets.',
        source: 'contact_page',
        status: 'new',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      },
      {
        id: 'lead-2',
        name: 'David Keller',
        email: 'dkeller@nexuslogistics.com',
        company: 'Nexus Logistics Group',
        phone: '+1 (415) 302-8819',
        serviceNeeded: 'operational-excellence',
        message: 'Need help eliminating warehouse dispatch bottlenecks across three regional fulfillment centers.',
        source: 'consultation_modal',
        status: 'in_progress',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      },
    ],
  };
}
