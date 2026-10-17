import { NextResponse } from 'next/server';
import { getPgPool, supabaseAdmin } from '@/lib/supabase';
import { fetchDatabaseFromSupabase } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const startTime = Date.now();
  let pgStatus = 'disconnected';
  let pgError: string | null = null;
  let restStatus = 'disconnected';
  let restError: string | null = null;
  let counts: Record<string, number> = {};

  // 1. Test PostgreSQL direct connection and table counts
  try {
    const pool = getPgPool();
    const [
      settingsRes,
      srvRes,
      csRes,
      blogRes,
      teamRes,
      testRes,
      faqRes,
      customRes,
      leadRes,
    ] = await Promise.all([
      pool.query('SELECT count(*) FROM site_settings'),
      pool.query('SELECT count(*) FROM services'),
      pool.query('SELECT count(*) FROM case_studies'),
      pool.query('SELECT count(*) FROM blogs'),
      pool.query('SELECT count(*) FROM team'),
      pool.query('SELECT count(*) FROM testimonials'),
      pool.query('SELECT count(*) FROM faqs'),
      pool.query('SELECT count(*) FROM custom_sections'),
      pool.query('SELECT count(*) FROM leads'),
    ]);

    counts = {
      site_settings: parseInt(settingsRes.rows[0].count, 10),
      services: parseInt(srvRes.rows[0].count, 10),
      case_studies: parseInt(csRes.rows[0].count, 10),
      blogs: parseInt(blogRes.rows[0].count, 10),
      team: parseInt(teamRes.rows[0].count, 10),
      testimonials: parseInt(testRes.rows[0].count, 10),
      faqs: parseInt(faqRes.rows[0].count, 10),
      custom_sections: parseInt(customRes.rows[0].count, 10),
      leads: parseInt(leadRes.rows[0].count, 10),
    };
    pgStatus = 'connected';
  } catch (err: any) {
    pgStatus = 'error';
    pgError = err.message || String(err);
  }

  // 2. Test Supabase REST API via supabaseAdmin
  try {
    const { count, error } = await supabaseAdmin
      .from('services')
      .select('*', { count: 'exact', head: true });
    if (error) {
      restStatus = 'error';
      restError = error.message;
    } else {
      restStatus = 'connected';
    }
  } catch (err: any) {
    restStatus = 'error';
    restError = err.message || String(err);
  }

  const latencyMs = Date.now() - startTime;

  return NextResponse.json({
    database: {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pnelseflvhniplbdvybu.supabase.co',
      postgresStatus: pgStatus,
      restApiStatus: restStatus,
      latencyMs,
      tableCounts: counts,
      errors: {
        postgres: pgError,
        restApi: restError,
      },
    },
    timestamp: new Date().toISOString(),
  });
}

// POST endpoint to trigger immediate sync / refresh from Supabase
export async function POST() {
  try {
    const synced = await fetchDatabaseFromSupabase();
    if (!synced) {
      return NextResponse.json({ success: false, error: 'Could not fetch from Supabase' }, { status: 500 });
    }
    return NextResponse.json({
      success: true,
      message: 'Successfully synchronized in-memory database from Supabase',
      counts: {
        services: synced.services.length,
        caseStudies: synced.caseStudies.length,
        blogs: synced.blogs.length,
        team: synced.team.length,
        testimonials: synced.testimonials.length,
        faqs: synced.faqs.length,
        customSections: synced.customSections.length,
        leads: synced.leads.length,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
