# Consilio® — Dynamic Executive Consulting & Zebra

A fully customized, high-performance website and content management platform built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, and an editorial luxury **Zebra / Monochrome design system**.

The platform is modeled after the official [Consilio Framer Template](https://consilio.framer.website/) and includes a powerful, secure **Admin CMS Dashboard** where administrators can create, edit, reorder, and delete any service, case study, blog post, page section, lead submission, and branding setting—with **all changes reflecting live on the public website in real time**.

---

## 🚀 Key Features

### 1. Public Website
- **Home Page (`/`)**:
  - High-impact luxury consulting Hero section with animated pill badges, dynamic statistics counters (`175+ Businesses Advised`, `12+ Years`, `98% Client Satisfaction`, `25+ Specialists`), and trust strip.
  - Interactive **Consultation Booking Modal** accessible from any page.
  - **Advisory Services Grid** with category filters and metric badges.
  - **Core Values / Principles** ("Principles Behind Our Client Partnerships").
  - **Client Transformations & Case Studies** with quantifiable metric callouts (`+48% Revenue`, `+42% Efficiency`).
  - **3-Phase Methodology Framework** ("Discover & Diagnose", "Strategize & Architect", "Execute & Optimize").
  - **The Difference Comparison Matrix** ("Other Traditional Firms" vs "With Consilio®").
  - **Client Proof / Testimonials** with verified 5-star ratings and executive quotes.
  - **Latest Industry News & Insights** directory.
  - **Collapsible FAQs Accordion**.
  - **Editorial High-Impact CTA Banner** ("Build clarity. Unlock growth.").
- **Services Directory (`/services`) & Dynamic Service Pages (`/services/[slug]`)**:
  - Dedicated pages for all 6 practices: *Growth Consulting*, *Financial Advisory*, *Business Strategy*, *Operational Excellence*, *Market Expansion*, and *Leadership Advisory*.
  - Full practice overview, core deliverables checklist, 3-step execution plan, and direct practice inquiry form.
- **Case Studies Directory (`/case-studies`) & Detail Pages (`/case-studies/[slug]`)**:
  - In-depth reviews of real client turnarounds (*Vertex Digital*, *Horizon Retail Co.*, *Northbridge Financial*, *Apex Industrial*, *Everwell Health Network*).
  - Phased narrative: *Phase I: The Challenge*, *Phase II: The Approach*, *Phase III: The Commercial Outcome*.
- **About Page (`/about`)**:
  - Consilio mission statement, executive statistics, core operating values, leadership team profiles, and comparison table.
- **Insights & Blog (`/blogs`) & Reader (`/blogs/[slug]`)**:
  - Clean editorial reader with estimated read times, author roles, category filters, and related article suggestions.
- **Contact Page (`/contact`)**:
  - Interactive inquiry submission form connected directly to the database lead pipeline.
  - 24/7 hotline card, direct partner email, and Austin headquarters address.

---

### 2. Powerful Admin Dashboard (`/admin`)
- **Secure Authentication**:
  - Protected admin routes with PBKDF2 cryptographic password hashing and signed HTTP-only session cookies.
  - Dedicated login screen at `/admin/login`.
- **Live Content Management (CRUD)**:
  - **Services Manager**: Add, edit, or delete practices, customize icons, deliverables, metrics, and homepage featured status.
  - **Case Studies Manager**: Create client case studies with custom metrics, challenge/approach/outcome narratives, and client quotes.
  - **Blog & Insights Manager**: Write and publish articles with rich markdown/headings, category tags, author metadata, and draft/published toggle.
  - **Client Leads & Inquiries Pipeline**: View incoming inquiries from the Contact page and Consultation modal, update pipeline status (*New*, *In Progress*, *Contacted*, *Archived*), and review client briefs.
  - **Dynamic Page Sections Builder**: Create, reorder, toggle, or edit custom content blocks and comparison matrices across any page.
  - **Branding & Global Settings**: Real-time control of site meta title, tagline, top announcement banner text & visibility, phone, email, address, and social URLs.
  - **Leadership Team & Testimonials**: Manage executive profiles and client review cards.
  - **One-Click Database Reset**: Restore original Consilio sample data at any time.

---

## 🔐 Default Admin Credentials

- **Admin Login URL**: `http://localhost:3000/admin/login`
- **Email**: `admin@consilio.com`
- **Password**: `consilio2026!`

*(Password can be updated anytime inside the Admin Dashboard under the "Admin Security" tab).*

---

## 🛠️ Technology Stack & Design System

- **Framework**: Next.js 15.5+ (App Router)
- **Library**: React 19, TypeScript
- **Styling**: Vanilla CSS & Custom Design System (HSL tokens, glassmorphism, responsive grid layouts, micro-animations)
- **Icons**: Lucide React
- **Database**: Local atomic JSON persistence engine (`data/consilio.json`) with safe atomic writes, zero external database setup required, instant seeding on boot.

---

## 🏃 Running the Project

### Development Server
```bash
npm.cmd run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm.cmd run build
npm.cmd start
```

---

© 2026 Consilio®. All rights reserved.
