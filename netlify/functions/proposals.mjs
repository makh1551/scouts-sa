import { getDb, headers } from './_db.mjs';

export default async (req, context) => {
  if (req.method === 'OPTIONS') return new Response('', { headers });

  const db = getDb();

  // ── GET — fetch all proposals ──
  if (req.method === 'GET') {
    try {
      const rows = await db`SELECT * FROM proposals ORDER BY created_at DESC`;
      return new Response(JSON.stringify({ success: true, data: rows }), { headers });
    } catch (e) {
      return new Response(JSON.stringify({ success: false, error: e.message }), { status: 500, headers });
    }
  }

  // ── POST — submit new proposal (anyone) ──
  if (req.method === 'POST') {
    try {
      const b = await req.json();
      await db`
        INSERT INTO proposals (uid, office_id, office_name, region, body, diff, status)
        VALUES (${b.uid}, ${b.oid}, ${b.nm}, ${b.rg}, ${JSON.stringify(b.body)}, ${JSON.stringify(b.diff)}, 'pending')
        ON CONFLICT (uid) DO NOTHING
      `;
      return new Response(JSON.stringify({ success: true }), { headers });
    } catch (e) {
      return new Response(JSON.stringify({ success: false, error: e.message }), { status: 500, headers });
    }
  }

  // ── PATCH — approve or reject (admin only) ──
  if (req.method === 'PATCH') {
    const AUTH = process.env.ADMIN_PASS || 'scouts2025';
    const token = req.headers.get('Authorization')?.replace('Bearer ', '');
    if (token !== AUTH) {
      return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), { status: 401, headers });
    }
    try {
      const { uid, status } = await req.json();
      await db`UPDATE proposals SET status=${status} WHERE uid=${uid}`;
      return new Response(JSON.stringify({ success: true }), { headers });
    } catch (e) {
      return new Response(JSON.stringify({ success: false, error: e.message }), { status: 500, headers });
    }
  }

  return new Response('Method not allowed', { status: 405, headers });
};

export const config = { path: '/api/proposals' };
