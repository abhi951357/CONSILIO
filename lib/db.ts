import fs from 'fs';
import path from 'path';
import { DatabaseSchema, SiteSettings, Service, CaseStudy, BlogPost, TeamMember, Testimonial, FAQItem, CustomSection, LeadSubmission } from '@/types';
import { getDefaultDatabase } from './default-data';
import { getPgPool } from './supabase';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'consilio.json');

let cachedDb: DatabaseSchema | null = null;
let lastMtime: number = 0;
let lastSupabaseSync: number = 0;
const SYNC_INTERVAL_MS = 15000; // Refresh from Supabase at most every 15s in background

function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Map Postgres rows to TypeScript models
function mapServiceRow(r: any): Service {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    category: r.category || '',
    iconName: r.icon_name || 'TrendingUp',
    shortDescription: r.short_description || '',
    fullOverview: r.full_overview || '',
    deliverables: Array.isArray(r.deliverables) ? r.deliverables : [],
    approach: Array.isArray(r.approach) ? r.approach : [],
    metrics: Array.isArray(r.metrics) ? r.metrics : [],
    featured: Boolean(r.featured),
    order: Number(r.sort_order ?? 0),
    updatedAt: r.updated_at || new Date().toISOString(),
  };
}

function mapCaseStudyRow(r: any): CaseStudy {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    client: r.client_name || '',
    industry: r.industry || '',
    serviceCategory: r.service_category || '',
    location: r.location || '',
    summary: r.summary || '',
    challenge: r.challenge || '',
    approach: r.approach || '',
    outcome: r.outcome || '',
    keyMetric: r.key_metric || '',
    metricLabel: r.metric_label || '',
    metrics: Array.isArray(r.metrics) ? r.metrics : [],
    clientQuote: r.client_quote || '',
    clientAuthor: r.client_author || '',
    clientRole: r.client_role || '',
    featured: Boolean(r.featured),
    order: Number(r.sort_order ?? 0),
    updatedAt: r.updated_at || new Date().toISOString(),
  };
}

function mapBlogRow(r: any): BlogPost {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt || '',
    content: r.content || '',
    category: r.category || '',
    author: r.author || '',
    authorRole: r.author_role || '',
    readTime: r.read_time || '5 min read',
    publishedDate: r.published_date || '',
    published: Boolean(r.published),
    featured: Boolean(r.featured),
    tags: Array.isArray(r.tags) ? r.tags : [],
    updatedAt: r.updated_at || new Date().toISOString(),
  };
}

function mapTeamRow(r: any): TeamMember {
  return {
    id: r.id,
    name: r.name,
    role: r.role,
    bio: r.bio || '',
    imageUrl: r.image_url || '',
    linkedinUrl: r.linkedin_url || '',
    order: Number(r.sort_order ?? 0),
  };
}

function mapTestimonialRow(r: any): Testimonial {
  return {
    id: r.id,
    quote: r.quote,
    clientName: r.client_name || '',
    clientRole: r.client_role || '',
    company: r.company || '',
    rating: Number(r.rating ?? 5),
    featured: Boolean(r.featured),
    order: Number(r.sort_order ?? 0),
  };
}

function mapFAQRow(r: any): FAQItem {
  return {
    id: r.id,
    question: r.question,
    answer: r.answer,
    category: r.category || '',
    order: Number(r.sort_order ?? 0),
  };
}

function mapCustomSectionRow(r: any): CustomSection {
  return {
    id: r.id,
    key: r.key,
    title: r.title,
    subtitle: r.subtitle || '',
    badge: r.badge || '',
    page: r.page || 'home',
    contentJson: r.content_json || '{}',
    enabled: Boolean(r.enabled),
    order: Number(r.sort_order ?? 0),
  };
}

function mapLeadRow(r: any): LeadSubmission {
  return {
    id: r.id,
    name: r.name,
    email: r.email,
    company: r.company || '',
    phone: r.phone || '',
    serviceNeeded: r.service_needed || '',
    message: r.message || '',
    source: r.source || '',
    status: r.status || 'new',
    createdAt: r.created_at || new Date().toISOString(),
  };
}

// Fetch complete schema from Supabase PostgreSQL
export async function fetchDatabaseFromSupabase(): Promise<DatabaseSchema | null> {
  try {
    const pool = getPgPool();
    const [
      settingsRes,
      servicesRes,
      caseStudiesRes,
      blogsRes,
      teamRes,
      testimonialsRes,
      faqsRes,
      customSectionsRes,
      leadsRes,
    ] = await Promise.all([
      pool.query('SELECT data FROM site_settings WHERE id = 1 LIMIT 1'),
      pool.query('SELECT * FROM services ORDER BY sort_order ASC'),
      pool.query('SELECT * FROM case_studies ORDER BY sort_order ASC'),
      pool.query('SELECT * FROM blogs ORDER BY published_date DESC'),
      pool.query('SELECT * FROM team ORDER BY sort_order ASC'),
      pool.query('SELECT * FROM testimonials ORDER BY sort_order ASC'),
      pool.query('SELECT * FROM faqs ORDER BY sort_order ASC'),
      pool.query('SELECT * FROM custom_sections ORDER BY sort_order ASC'),
      pool.query('SELECT * FROM leads ORDER BY created_at DESC'),
    ]);

    const settings: SiteSettings = settingsRes.rows[0]?.data || getDefaultDatabase().settings;
    const services: Service[] = servicesRes.rows.map(mapServiceRow);
    const caseStudies: CaseStudy[] = caseStudiesRes.rows.map(mapCaseStudyRow);
    const blogs: BlogPost[] = blogsRes.rows.map(mapBlogRow);
    const team: TeamMember[] = teamRes.rows.map(mapTeamRow);
    const testimonials: Testimonial[] = testimonialsRes.rows.map(mapTestimonialRow);
    const faqs: FAQItem[] = faqsRes.rows.map(mapFAQRow);
    const customSections: CustomSection[] = customSectionsRes.rows.map(mapCustomSectionRow);
    const leads: LeadSubmission[] = leadsRes.rows.map(mapLeadRow);

    const fullDb: DatabaseSchema = {
      settings,
      services,
      caseStudies,
      blogs,
      team,
      testimonials,
      faqs,
      customSections,
      leads,
    };

    // Update in-memory cache and backup file
    cachedDb = fullDb;
    lastSupabaseSync = Date.now();
    try {
      ensureDataDir();
      fs.writeFileSync(DB_FILE, JSON.stringify(fullDb, null, 2), 'utf-8');
      lastMtime = fs.statSync(DB_FILE).mtimeMs;
    } catch (e) {
      // Non-fatal if filesystem write fails in serverless
    }

    return fullDb;
  } catch (err) {
    console.error('Failed to fetch data from Supabase:', err);
    return null;
  }
}

// Background sync trigger if cache is stale
function triggerBackgroundSupabaseSync(): void {
  const now = Date.now();
  if (now - lastSupabaseSync > SYNC_INTERVAL_MS) {
    lastSupabaseSync = now;
    fetchDatabaseFromSupabase().catch((err) => {
      console.warn('Background Supabase sync error:', err);
    });
  }
}

export function getDatabase(): DatabaseSchema {
  ensureDataDir();

  // If we already have cached database in memory
  if (cachedDb) {
    triggerBackgroundSupabaseSync();
    return cachedDb;
  }

  // Read from local backup if present
  if (fs.existsSync(DB_FILE)) {
    try {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      cachedDb = JSON.parse(raw) as DatabaseSchema;
      lastMtime = fs.statSync(DB_FILE).mtimeMs;
      triggerBackgroundSupabaseSync();
      return cachedDb;
    } catch (err) {
      console.error('Error reading database file:', err);
    }
  }

  // Fallback to defaults
  const initialData = getDefaultDatabase();
  cachedDb = initialData;
  triggerBackgroundSupabaseSync();
  return initialData;
}

export async function getDatabaseAsync(): Promise<DatabaseSchema> {
  const fromSupabase = await fetchDatabaseFromSupabase();
  if (fromSupabase) return fromSupabase;
  return getDatabase();
}

export function saveDatabase(data: DatabaseSchema): void {
  ensureDataDir();
  cachedDb = data;
  try {
    const tempFile = `${DB_FILE}.${Date.now()}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
  } catch (e) {
    // Non-fatal
  }

  // Sync to Supabase in background
  syncFullDbToSupabase(data).catch((err) => {
    console.error('Error syncing full database to Supabase:', err);
  });
}

async function syncFullDbToSupabase(data: DatabaseSchema): Promise<void> {
  const pool = getPgPool();
  if (data.settings) {
    await pool.query(
      `INSERT INTO site_settings (id, data, updated_at) VALUES (1, $1, NOW())
       ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()`,
      [JSON.stringify(data.settings)]
    );
  }
}

// --- Settings ---
export function getSettings(): SiteSettings {
  const db = getDatabase();
  return db.settings;
}

export function updateSettings(partial: Partial<SiteSettings>): SiteSettings {
  const db = getDatabase();
  db.settings = { ...db.settings, ...partial };
  cachedDb = db;

  // Persist locally
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch {}

  // Sync to Supabase
  const pool = getPgPool();
  pool.query(
    `INSERT INTO site_settings (id, data, updated_at) VALUES (1, $1, NOW())
     ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()`,
    [JSON.stringify(db.settings)]
  ).catch((err) => console.error('Supabase settings update error:', err));

  return db.settings;
}

// --- Services ---
export function getServices(onlyFeatured = false): Service[] {
  const db = getDatabase();
  const list = [...db.services].sort((a, b) => a.order - b.order);
  return onlyFeatured ? list.filter((s) => s.featured) : list;
}

export function getServiceBySlug(slug: string): Service | undefined {
  const db = getDatabase();
  return db.services.find((s) => s.slug === slug);
}

export function saveService(service: Service): Service {
  const db = getDatabase();
  const existingIdx = db.services.findIndex((s) => s.id === service.id);
  const now = new Date().toISOString();

  let toSave: Service;
  if (existingIdx >= 0) {
    toSave = { ...service, updatedAt: now };
    db.services[existingIdx] = toSave;
  } else {
    toSave = {
      ...service,
      id: service.id || `srv-${Date.now()}`,
      order: service.order ?? db.services.length + 1,
      updatedAt: now,
    };
    db.services.push(toSave);
  }
  cachedDb = db;

  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch {}

  // Sync to Supabase
  const pool = getPgPool();
  pool.query(
    `INSERT INTO services (id, slug, title, category, icon_name, short_description, full_overview, deliverables, approach, metrics, featured, sort_order, updated_at)
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
       updated_at = EXCLUDED.updated_at`,
    [
      toSave.id,
      toSave.slug,
      toSave.title,
      toSave.category || '',
      toSave.iconName || 'TrendingUp',
      toSave.shortDescription || '',
      toSave.fullOverview || '',
      JSON.stringify(toSave.deliverables || []),
      JSON.stringify(toSave.approach || []),
      JSON.stringify(toSave.metrics || []),
      toSave.featured ?? false,
      toSave.order ?? 0,
      toSave.updatedAt,
    ]
  ).catch((err) => console.error('Supabase saveService error:', err));

  return toSave;
}

export function deleteService(id: string): boolean {
  const db = getDatabase();
  const initialLength = db.services.length;
  db.services = db.services.filter((s) => s.id !== id);
  if (db.services.length !== initialLength) {
    cachedDb = db;
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
    } catch {}

    const pool = getPgPool();
    pool.query('DELETE FROM services WHERE id = $1', [id]).catch((err) =>
      console.error('Supabase deleteService error:', err)
    );
    return true;
  }
  return false;
}

// --- Case Studies ---
export function getCaseStudies(onlyFeatured = false): CaseStudy[] {
  const db = getDatabase();
  const list = [...db.caseStudies].sort((a, b) => a.order - b.order);
  return onlyFeatured ? list.filter((cs) => cs.featured) : list;
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  const db = getDatabase();
  return db.caseStudies.find((cs) => cs.slug === slug);
}

export function saveCaseStudy(study: CaseStudy): CaseStudy {
  const db = getDatabase();
  const existingIdx = db.caseStudies.findIndex((cs) => cs.id === study.id);
  const now = new Date().toISOString();

  let toSave: CaseStudy;
  if (existingIdx >= 0) {
    toSave = { ...study, updatedAt: now };
    db.caseStudies[existingIdx] = toSave;
  } else {
    toSave = {
      ...study,
      id: study.id || `cs-${Date.now()}`,
      order: study.order ?? db.caseStudies.length + 1,
      updatedAt: now,
    };
    db.caseStudies.push(toSave);
  }
  cachedDb = db;

  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch {}

  const pool = getPgPool();
  pool.query(
    `INSERT INTO case_studies (id, slug, title, client_name, industry, service_category, location, summary, challenge, approach, outcome, key_metric, metric_label, metrics, client_quote, client_author, client_role, featured, sort_order, updated_at)
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
       updated_at = EXCLUDED.updated_at`,
    [
      toSave.id,
      toSave.slug,
      toSave.title,
      toSave.client || '',
      toSave.industry || '',
      toSave.serviceCategory || '',
      toSave.location || '',
      toSave.summary || '',
      toSave.challenge || '',
      toSave.approach || '',
      toSave.outcome || '',
      toSave.keyMetric || '',
      toSave.metricLabel || '',
      JSON.stringify(toSave.metrics || []),
      toSave.clientQuote || '',
      toSave.clientAuthor || '',
      toSave.clientRole || '',
      toSave.featured ?? false,
      toSave.order ?? 0,
      toSave.updatedAt,
    ]
  ).catch((err) => console.error('Supabase saveCaseStudy error:', err));

  return toSave;
}

export function deleteCaseStudy(id: string): boolean {
  const db = getDatabase();
  const initialLen = db.caseStudies.length;
  db.caseStudies = db.caseStudies.filter((cs) => cs.id !== id);
  if (db.caseStudies.length !== initialLen) {
    cachedDb = db;
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
    } catch {}

    const pool = getPgPool();
    pool.query('DELETE FROM case_studies WHERE id = $1', [id]).catch((err) =>
      console.error('Supabase deleteCaseStudy error:', err)
    );
    return true;
  }
  return false;
}

// --- Blog Posts ---
export function getBlogs(onlyPublished = true): BlogPost[] {
  const db = getDatabase();
  let list = [...db.blogs].sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
  if (onlyPublished) {
    list = list.filter((b) => b.published);
  }
  return list;
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  const db = getDatabase();
  return db.blogs.find((b) => b.slug === slug);
}

export function saveBlog(blog: BlogPost): BlogPost {
  const db = getDatabase();
  const existingIdx = db.blogs.findIndex((b) => b.id === blog.id);
  const now = new Date().toISOString();

  let toSave: BlogPost;
  if (existingIdx >= 0) {
    toSave = { ...blog, updatedAt: now };
    db.blogs[existingIdx] = toSave;
  } else {
    toSave = {
      ...blog,
      id: blog.id || `blog-${Date.now()}`,
      updatedAt: now,
    };
    db.blogs.push(toSave);
  }
  cachedDb = db;

  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch {}

  const pool = getPgPool();
  pool.query(
    `INSERT INTO blogs (id, slug, title, excerpt, content, category, author, author_role, read_time, published_date, published, featured, tags, updated_at)
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
       updated_at = EXCLUDED.updated_at`,
    [
      toSave.id,
      toSave.slug,
      toSave.title,
      toSave.excerpt || '',
      toSave.content || '',
      toSave.category || '',
      toSave.author || '',
      toSave.authorRole || '',
      toSave.readTime || '5 min read',
      toSave.publishedDate || new Date().toISOString().split('T')[0],
      toSave.published ?? true,
      toSave.featured ?? false,
      JSON.stringify(toSave.tags || []),
      toSave.updatedAt,
    ]
  ).catch((err) => console.error('Supabase saveBlog error:', err));

  return toSave;
}

export function deleteBlog(id: string): boolean {
  const db = getDatabase();
  const initialLen = db.blogs.length;
  db.blogs = db.blogs.filter((b) => b.id !== id);
  if (db.blogs.length !== initialLen) {
    cachedDb = db;
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
    } catch {}

    const pool = getPgPool();
    pool.query('DELETE FROM blogs WHERE id = $1', [id]).catch((err) =>
      console.error('Supabase deleteBlog error:', err)
    );
    return true;
  }
  return false;
}

// --- Team Members ---
export function getTeam(): TeamMember[] {
  const db = getDatabase();
  return [...db.team].sort((a, b) => a.order - b.order);
}

export function saveTeamMember(member: TeamMember): TeamMember {
  const db = getDatabase();
  const idx = db.team.findIndex((t) => t.id === member.id);

  let toSave: TeamMember;
  if (idx >= 0) {
    toSave = member;
    db.team[idx] = toSave;
  } else {
    toSave = {
      ...member,
      id: member.id || `tm-${Date.now()}`,
      order: member.order ?? db.team.length + 1,
    };
    db.team.push(toSave);
  }
  cachedDb = db;

  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch {}

  const pool = getPgPool();
  pool.query(
    `INSERT INTO team (id, name, role, bio, image_url, linkedin_url, sort_order)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     ON CONFLICT (id) DO UPDATE SET
       name = EXCLUDED.name,
       role = EXCLUDED.role,
       bio = EXCLUDED.bio,
       image_url = EXCLUDED.image_url,
       linkedin_url = EXCLUDED.linkedin_url,
       sort_order = EXCLUDED.sort_order`,
    [
      toSave.id,
      toSave.name,
      toSave.role,
      toSave.bio || '',
      toSave.imageUrl || '',
      toSave.linkedinUrl || '',
      toSave.order ?? 0,
    ]
  ).catch((err) => console.error('Supabase saveTeamMember error:', err));

  return toSave;
}

export function deleteTeamMember(id: string): boolean {
  const db = getDatabase();
  const initialLen = db.team.length;
  db.team = db.team.filter((t) => t.id !== id);
  if (db.team.length !== initialLen) {
    cachedDb = db;
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
    } catch {}

    const pool = getPgPool();
    pool.query('DELETE FROM team WHERE id = $1', [id]).catch((err) =>
      console.error('Supabase deleteTeamMember error:', err)
    );
    return true;
  }
  return false;
}

// --- Testimonials ---
export function getTestimonials(onlyFeatured = false): Testimonial[] {
  const db = getDatabase();
  const list = [...db.testimonials].sort((a, b) => a.order - b.order);
  return onlyFeatured ? list.filter((t) => t.featured) : list;
}

export function saveTestimonial(testimonial: Testimonial): Testimonial {
  const db = getDatabase();
  const idx = db.testimonials.findIndex((t) => t.id === testimonial.id);

  let toSave: Testimonial;
  if (idx >= 0) {
    toSave = testimonial;
    db.testimonials[idx] = toSave;
  } else {
    toSave = {
      ...testimonial,
      id: testimonial.id || `test-${Date.now()}`,
      order: testimonial.order ?? db.testimonials.length + 1,
    };
    db.testimonials.push(toSave);
  }
  cachedDb = db;

  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch {}

  const pool = getPgPool();
  pool.query(
    `INSERT INTO testimonials (id, quote, client_name, client_role, company, rating, featured, sort_order)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     ON CONFLICT (id) DO UPDATE SET
       quote = EXCLUDED.quote,
       client_name = EXCLUDED.client_name,
       client_role = EXCLUDED.client_role,
       company = EXCLUDED.company,
       rating = EXCLUDED.rating,
       featured = EXCLUDED.featured,
       sort_order = EXCLUDED.sort_order`,
    [
      toSave.id,
      toSave.quote,
      toSave.clientName || '',
      toSave.clientRole || '',
      toSave.company || '',
      toSave.rating ?? 5,
      toSave.featured ?? false,
      toSave.order ?? 0,
    ]
  ).catch((err) => console.error('Supabase saveTestimonial error:', err));

  return toSave;
}

export function deleteTestimonial(id: string): boolean {
  const db = getDatabase();
  const initialLen = db.testimonials.length;
  db.testimonials = db.testimonials.filter((t) => t.id !== id);
  if (db.testimonials.length !== initialLen) {
    cachedDb = db;
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
    } catch {}

    const pool = getPgPool();
    pool.query('DELETE FROM testimonials WHERE id = $1', [id]).catch((err) =>
      console.error('Supabase deleteTestimonial error:', err)
    );
    return true;
  }
  return false;
}

// --- FAQs ---
export function getFAQs(): FAQItem[] {
  const db = getDatabase();
  return [...db.faqs].sort((a, b) => a.order - b.order);
}

export function saveFAQ(faq: FAQItem): FAQItem {
  const db = getDatabase();
  const idx = db.faqs.findIndex((f) => f.id === faq.id);

  let toSave: FAQItem;
  if (idx >= 0) {
    toSave = faq;
    db.faqs[idx] = toSave;
  } else {
    toSave = {
      ...faq,
      id: faq.id || `faq-${Date.now()}`,
      order: faq.order ?? db.faqs.length + 1,
    };
    db.faqs.push(toSave);
  }
  cachedDb = db;

  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch {}

  const pool = getPgPool();
  pool.query(
    `INSERT INTO faqs (id, question, answer, category, sort_order)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (id) DO UPDATE SET
       question = EXCLUDED.question,
       answer = EXCLUDED.answer,
       category = EXCLUDED.category,
       sort_order = EXCLUDED.sort_order`,
    [toSave.id, toSave.question, toSave.answer, toSave.category || '', toSave.order ?? 0]
  ).catch((err) => console.error('Supabase saveFAQ error:', err));

  return toSave;
}

export function deleteFAQ(id: string): boolean {
  const db = getDatabase();
  const initialLen = db.faqs.length;
  db.faqs = db.faqs.filter((f) => f.id !== id);
  if (db.faqs.length !== initialLen) {
    cachedDb = db;
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
    } catch {}

    const pool = getPgPool();
    pool.query('DELETE FROM faqs WHERE id = $1', [id]).catch((err) =>
      console.error('Supabase deleteFAQ error:', err)
    );
    return true;
  }
  return false;
}

// --- Custom Sections & Pages ---
export function getCustomSections(page?: string): CustomSection[] {
  const db = getDatabase();
  let list = [...(db.customSections || [])].sort((a, b) => a.order - b.order);
  if (page) {
    list = list.filter((cs) => cs.page === page || cs.page === 'all');
  }
  return list;
}

export function saveCustomSection(section: CustomSection): CustomSection {
  const db = getDatabase();
  if (!db.customSections) db.customSections = [];
  const idx = db.customSections.findIndex((cs) => cs.id === section.id);

  let toSave: CustomSection;
  if (idx >= 0) {
    toSave = section;
    db.customSections[idx] = toSave;
  } else {
    toSave = {
      ...section,
      id: section.id || `sec-${Date.now()}`,
      order: section.order ?? db.customSections.length + 1,
    };
    db.customSections.push(toSave);
  }
  cachedDb = db;

  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch {}

  const pool = getPgPool();
  pool.query(
    `INSERT INTO custom_sections (id, key, title, subtitle, badge, page, content_json, enabled, sort_order)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     ON CONFLICT (id) DO UPDATE SET
       key = EXCLUDED.key,
       title = EXCLUDED.title,
       subtitle = EXCLUDED.subtitle,
       badge = EXCLUDED.badge,
       page = EXCLUDED.page,
       content_json = EXCLUDED.content_json,
       enabled = EXCLUDED.enabled,
       sort_order = EXCLUDED.sort_order`,
    [
      toSave.id,
      toSave.key,
      toSave.title,
      toSave.subtitle || '',
      toSave.badge || '',
      toSave.page || 'home',
      toSave.contentJson || '{}',
      toSave.enabled ?? true,
      toSave.order ?? 0,
    ]
  ).catch((err) => console.error('Supabase saveCustomSection error:', err));

  return toSave;
}

export function deleteCustomSection(id: string): boolean {
  const db = getDatabase();
  if (!db.customSections) return false;
  const initialLen = db.customSections.length;
  db.customSections = db.customSections.filter((cs) => cs.id !== id);
  if (db.customSections.length !== initialLen) {
    cachedDb = db;
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
    } catch {}

    const pool = getPgPool();
    pool.query('DELETE FROM custom_sections WHERE id = $1', [id]).catch((err) =>
      console.error('Supabase deleteCustomSection error:', err)
    );
    return true;
  }
  return false;
}

// --- Leads ---
export function getLeads(): LeadSubmission[] {
  const db = getDatabase();
  return [...(db.leads || [])].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function addLead(lead: Omit<LeadSubmission, 'id' | 'createdAt'>): LeadSubmission {
  const db = getDatabase();
  if (!db.leads) db.leads = [];
  const newLead: LeadSubmission = {
    ...lead,
    id: `lead-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  db.leads.unshift(newLead);
  cachedDb = db;

  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch {}

  const pool = getPgPool();
  pool.query(
    `INSERT INTO leads (id, name, email, company, phone, service_needed, message, source, status, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
    [
      newLead.id,
      newLead.name,
      newLead.email,
      newLead.company || '',
      newLead.phone || '',
      newLead.serviceNeeded || '',
      newLead.message || '',
      newLead.source || '',
      newLead.status || 'new',
      newLead.createdAt,
    ]
  ).catch((err) => console.error('Supabase addLead error:', err));

  return newLead;
}

export function updateLeadStatus(id: string, status: LeadSubmission['status']): boolean {
  const db = getDatabase();
  if (!db.leads) return false;
  const lead = db.leads.find((l) => l.id === id);
  if (lead) {
    lead.status = status;
    cachedDb = db;
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
    } catch {}

    const pool = getPgPool();
    pool.query('UPDATE leads SET status = $1 WHERE id = $2', [status, id]).catch((err) =>
      console.error('Supabase updateLeadStatus error:', err)
    );
    return true;
  }
  return false;
}

export function deleteLead(id: string): boolean {
  const db = getDatabase();
  if (!db.leads) return false;
  const initialLen = db.leads.length;
  db.leads = db.leads.filter((l) => l.id !== id);
  if (db.leads.length !== initialLen) {
    cachedDb = db;
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
    } catch {}

    const pool = getPgPool();
    pool.query('DELETE FROM leads WHERE id = $1', [id]).catch((err) =>
      console.error('Supabase deleteLead error:', err)
    );
    return true;
  }
  return false;
}

// --- Database Reset ---

export function resetDatabaseToDefaults(): DatabaseSchema {
  const defaultData = getDefaultDatabase();
  saveDatabase(defaultData);
  return defaultData;
}
