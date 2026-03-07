import { getDb, headers } from './_db.mjs';

export default async (req, context) => {
  if (req.method === 'OPTIONS') return new Response('', { headers });

  const db = getDb();

  // ── GET — fetch all offices ──
  if (req.method === 'GET') {
    try {
      const rows = await db`SELECT * FROM offices ORDER BY id`;
      return new Response(JSON.stringify({ success: true, data: rows }), { headers });
    } catch (e) {
      return new Response(JSON.stringify({ success: false, error: e.message }), { status: 500, headers });
    }
  }

  // ── PUT — update one office ──
  if (req.method === 'PUT') {
    const AUTH = process.env.ADMIN_PASS || 'scouts2025';
    const token = req.headers.get('Authorization')?.replace('Bearer ', '');
    if (token !== AUTH) {
      return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), { status: 401, headers });
    }
    try {
      const b = await req.json();
      await db`
        INSERT INTO offices (id, region, name, phone, email, manager, year, members, digital, notes, social_twitter, social_instagram, photo, updated_at)
        VALUES (${b.id}, ${b.region||''}, ${b.name||''}, ${b.phone||''}, ${b.email||''}, ${b.manager||''}, ${b.year||''}, ${b.members||''}, ${b.digital||'none'}, ${b.notes||''}, ${b.social_media?.twitter||''}, ${b.social_media?.instagram||''}, ${b.photo||''}, NOW())
        ON CONFLICT (id) DO UPDATE SET
          phone=EXCLUDED.phone, email=EXCLUDED.email, manager=EXCLUDED.manager,
          year=EXCLUDED.year, members=EXCLUDED.members, digital=EXCLUDED.digital,
          notes=EXCLUDED.notes, social_twitter=EXCLUDED.social_twitter,
          social_instagram=EXCLUDED.social_instagram, photo=EXCLUDED.photo,
          updated_at=NOW()
      `;
      return new Response(JSON.stringify({ success: true }), { headers });
    } catch (e) {
      return new Response(JSON.stringify({ success: false, error: e.message }), { status: 500, headers });
    }
  }

  return new Response('Method not allowed', { status: 405, headers });
};

export const config = { path: '/api/offices' };
