const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const client = new Client({
  host: process.env.DATABASE_HOST || 'aws-0-ap-south-1.pooler.supabase.com',
  port: parseInt(process.env.DATABASE_PORT || '6543', 10),
  user: process.env.DATABASE_USER || 'postgres.pnelseflvhniplbdvybu',
  password: process.env.DATABASE_PASSWORD || 'xiMDOjarZhEfXAVz',
  database: process.env.DATABASE_NAME || 'postgres',
  ssl: { rejectUnauthorized: false }
});

const ddl = `
-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id INT PRIMARY KEY DEFAULT 1,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT,
  icon_name TEXT,
  short_description TEXT,
  full_overview TEXT,
  deliverables JSONB DEFAULT '[]'::jsonb,
  approach JSONB DEFAULT '[]'::jsonb,
  metrics JSONB DEFAULT '[]'::jsonb,
  featured BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  updated_at TEXT
);

-- Create case_studies table
CREATE TABLE IF NOT EXISTS case_studies (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  client_name TEXT,
  industry TEXT,
  service_category TEXT,
  location TEXT,
  summary TEXT,
  challenge TEXT,
  approach TEXT,
  outcome TEXT,
  key_metric TEXT,
  metric_label TEXT,
  metrics JSONB DEFAULT '[]'::jsonb,
  client_quote TEXT,
  client_author TEXT,
  client_role TEXT,
  featured BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  updated_at TEXT
);

-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  category TEXT,
  author TEXT,
  author_role TEXT,
  read_time TEXT,
  published_date TEXT,
  published BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  tags JSONB DEFAULT '[]'::jsonb,
  updated_at TEXT
);

-- Create team table
CREATE TABLE IF NOT EXISTS team (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  linkedin_url TEXT,
  sort_order INT DEFAULT 0
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY,
  quote TEXT NOT NULL,
  client_name TEXT NOT NULL,
  client_role TEXT,
  company TEXT,
  rating INT DEFAULT 5,
  featured BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0
);

-- Create faqs table
CREATE TABLE IF NOT EXISTS faqs (
  id TEXT PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  sort_order INT DEFAULT 0
);

-- Create custom_sections table
CREATE TABLE IF NOT EXISTS custom_sections (
  id TEXT PRIMARY KEY,
  key TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  badge TEXT,
  page TEXT,
  content_json TEXT,
  enabled BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0
);

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  service_needed TEXT,
  message TEXT,
  source TEXT,
  status TEXT DEFAULT 'new',
  created_at TEXT
);

-- Enable RLS and grant read access to anon/authenticated for public content
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE team ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policies if they do not exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read settings') THEN
    CREATE POLICY "Public read settings" ON site_settings FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read services') THEN
    CREATE POLICY "Public read services" ON services FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read case_studies') THEN
    CREATE POLICY "Public read case_studies" ON case_studies FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read blogs') THEN
    CREATE POLICY "Public read blogs" ON blogs FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read team') THEN
    CREATE POLICY "Public read team" ON team FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read testimonials') THEN
    CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read faqs') THEN
    CREATE POLICY "Public read faqs" ON faqs FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read custom_sections') THEN
    CREATE POLICY "Public read custom_sections" ON custom_sections FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public insert leads') THEN
    CREATE POLICY "Public insert leads" ON leads FOR INSERT WITH CHECK (true);
  END IF;
END $$;
`;

async function migrate() {
  try {
    console.log('Connecting to Supabase PostgreSQL...');
    await client.connect();
    console.log('Connected! Creating tables and policies...');
    await client.query(ddl);
    console.log('Tables and policies created successfully.');

    // Load existing data
    const jsonPath = path.join(__dirname, '..', 'data', 'consilio.json');
    if (fs.existsSync(jsonPath)) {
      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

      // 1. Settings
      if (data.settings) {
        await client.query(`
          INSERT INTO site_settings (id, data, updated_at)
          VALUES (1, $1, NOW())
          ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW();
        `, [JSON.stringify(data.settings)]);
        console.log('Migrated settings.');
      }

      // 2. Services
      if (Array.isArray(data.services)) {
        for (const s of data.services) {
          await client.query(`
            INSERT INTO services (id, slug, title, category, icon_name, short_description, full_overview, deliverables, approach, metrics, featured, sort_order, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
            ON CONFLICT (id) DO UPDATE SET
              slug = EXCLUDED.slug,
              title = EXCLUDED.title,
              category = EXCLUDED.category,
              icon_name = EXCLUDED.icon_name,
              short_description = EXCLUDED.short_description,
              full_overview = EXCLUDED.full_overview,
              deliverables = EXCLUDED.deliverables,
              approach = EXCLUDED.approach,
              metrics = EXCLUDED.metrics,
              featured = EXCLUDED.featured,
              sort_order = EXCLUDED.sort_order,
              updated_at = EXCLUDED.updated_at;
          `, [
            s.id, s.slug, s.title, s.category || '', s.iconName || '', s.shortDescription || '', s.fullOverview || '',
            JSON.stringify(s.deliverables || []), JSON.stringify(s.approach || []), JSON.stringify(s.metrics || []),
            s.featured ?? false, s.order ?? 0, s.updatedAt || new Date().toISOString()
          ]);
        }
        console.log(`Migrated ${data.services.length} services.`);
      }

      // 3. Case Studies
      if (Array.isArray(data.caseStudies)) {
        for (const cs of data.caseStudies) {
          await client.query(`
            INSERT INTO case_studies (id, slug, title, client_name, industry, service_category, location, summary, challenge, approach, outcome, key_metric, metric_label, metrics, client_quote, client_author, client_role, featured, sort_order, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
            ON CONFLICT (id) DO UPDATE SET
              slug = EXCLUDED.slug,
              title = EXCLUDED.title,
              client_name = EXCLUDED.client_name,
              industry = EXCLUDED.industry,
              service_category = EXCLUDED.service_category,
              location = EXCLUDED.location,
              summary = EXCLUDED.summary,
              challenge = EXCLUDED.challenge,
              approach = EXCLUDED.approach,
              outcome = EXCLUDED.outcome,
              key_metric = EXCLUDED.key_metric,
              metric_label = EXCLUDED.metric_label,
              metrics = EXCLUDED.metrics,
              client_quote = EXCLUDED.client_quote,
              client_author = EXCLUDED.client_author,
              client_role = EXCLUDED.client_role,
              featured = EXCLUDED.featured,
              sort_order = EXCLUDED.sort_order,
              updated_at = EXCLUDED.updated_at;
          `, [
            cs.id, cs.slug, cs.title, cs.client || '', cs.industry || '', cs.serviceCategory || '', cs.location || '',
            cs.summary || '', cs.challenge || '', cs.approach || '', cs.outcome || '', cs.keyMetric || '', cs.metricLabel || '',
            JSON.stringify(cs.metrics || []), cs.clientQuote || '', cs.clientAuthor || '', cs.clientRole || '',
            cs.featured ?? false, cs.order ?? 0, cs.updatedAt || new Date().toISOString()
          ]);
        }
        console.log(`Migrated ${data.caseStudies.length} case studies.`);
      }

      // 4. Blogs
      if (Array.isArray(data.blogs)) {
        for (const b of data.blogs) {
          await client.query(`
            INSERT INTO blogs (id, slug, title, excerpt, content, category, author, author_role, read_time, published_date, published, featured, tags, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
            ON CONFLICT (id) DO UPDATE SET
              slug = EXCLUDED.slug,
              title = EXCLUDED.title,
              excerpt = EXCLUDED.excerpt,
              content = EXCLUDED.content,
              category = EXCLUDED.category,
              author = EXCLUDED.author,
              author_role = EXCLUDED.author_role,
              read_time = EXCLUDED.read_time,
              published_date = EXCLUDED.published_date,
              published = EXCLUDED.published,
              featured = EXCLUDED.featured,
              tags = EXCLUDED.tags,
              updated_at = EXCLUDED.updated_at;
          `, [
            b.id, b.slug, b.title, b.excerpt || '', b.content || '', b.category || '', b.author || '', b.authorRole || '',
            b.readTime || '', b.publishedDate || '', b.published ?? true, b.featured ?? false,
            JSON.stringify(b.tags || []), b.updatedAt || new Date().toISOString()
          ]);
        }
        console.log(`Migrated ${data.blogs.length} blogs.`);
      }

      // 5. Team
      if (Array.isArray(data.team)) {
        for (const t of data.team) {
          await client.query(`
            INSERT INTO team (id, name, role, bio, image_url, linkedin_url, sort_order)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT (id) DO UPDATE SET
              name = EXCLUDED.name,
              role = EXCLUDED.role,
              bio = EXCLUDED.bio,
              image_url = EXCLUDED.image_url,
              linkedin_url = EXCLUDED.linkedin_url,
              sort_order = EXCLUDED.sort_order;
          `, [t.id, t.name, t.role, t.bio || '', t.imageUrl || '', t.linkedinUrl || '', t.order ?? 0]);
        }
        console.log(`Migrated ${data.team.length} team members.`);
      }

      // 6. Testimonials
      if (Array.isArray(data.testimonials)) {
        for (const test of data.testimonials) {
          await client.query(`
            INSERT INTO testimonials (id, quote, client_name, client_role, company, rating, featured, sort_order)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            ON CONFLICT (id) DO UPDATE SET
              quote = EXCLUDED.quote,
              client_name = EXCLUDED.client_name,
              client_role = EXCLUDED.client_role,
              company = EXCLUDED.company,
              rating = EXCLUDED.rating,
              featured = EXCLUDED.featured,
              sort_order = EXCLUDED.sort_order;
          `, [test.id, test.quote, test.clientName || '', test.clientRole || '', test.company || '', test.rating ?? 5, test.featured ?? false, test.order ?? 0]);
        }
        console.log(`Migrated ${data.testimonials.length} testimonials.`);
      }

      // 7. FAQs
      if (Array.isArray(data.faqs)) {
        for (const f of data.faqs) {
          await client.query(`
            INSERT INTO faqs (id, question, answer, category, sort_order)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (id) DO UPDATE SET
              question = EXCLUDED.question,
              answer = EXCLUDED.answer,
              category = EXCLUDED.category,
              sort_order = EXCLUDED.sort_order;
          `, [f.id, f.question, f.answer, f.category || '', f.order ?? 0]);
        }
        console.log(`Migrated ${data.faqs.length} FAQs.`);
      }

      // 8. Custom Sections
      if (Array.isArray(data.customSections)) {
        for (const cs of data.customSections) {
          await client.query(`
            INSERT INTO custom_sections (id, key, title, subtitle, badge, page, content_json, enabled, sort_order)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            ON CONFLICT (id) DO UPDATE SET
              key = EXCLUDED.key,
              title = EXCLUDED.title,
              subtitle = EXCLUDED.subtitle,
              badge = EXCLUDED.badge,
              page = EXCLUDED.page,
              content_json = EXCLUDED.content_json,
              enabled = EXCLUDED.enabled,
              sort_order = EXCLUDED.sort_order;
          `, [cs.id, cs.key, cs.title, cs.subtitle || '', cs.badge || '', cs.page || 'home', cs.contentJson || '{}', cs.enabled ?? true, cs.order ?? 0]);
        }
        console.log(`Migrated ${data.customSections.length} custom sections.`);
      }

      // 9. Leads
      if (Array.isArray(data.leads)) {
        for (const l of data.leads) {
          await client.query(`
            INSERT INTO leads (id, name, email, company, phone, service_needed, message, source, status, created_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            ON CONFLICT (id) DO UPDATE SET
              name = EXCLUDED.name,
              email = EXCLUDED.email,
              company = EXCLUDED.company,
              phone = EXCLUDED.phone,
              service_needed = EXCLUDED.service_needed,
              message = EXCLUDED.message,
              source = EXCLUDED.source,
              status = EXCLUDED.status,
              created_at = EXCLUDED.created_at;
          `, [l.id, l.name, l.email, l.company || '', l.phone || '', l.serviceNeeded || '', l.message || '', l.source || '', l.status || 'new', l.createdAt || new Date().toISOString()]);
        }
        console.log(`Migrated ${data.leads.length} leads.`);
      }
    }

    console.log('--- Migration completed successfully! ---');
  } catch (err) {
    console.error('Migration error:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

migrate();
