import { del } from '@vercel/blob';

// Host-only: remove a photo. Needs ADMIN_KEY.
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { url, key } = req.body || {};
  if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) return res.status(401).json({ error: 'No' });
  if (!/^https:\/\/[^/]+\.blob\.vercel-storage\.com\/guests\//.test(url || '')) return res.status(400).json({ error: 'Bad url' });
  await del(url);
  res.status(200).json({ ok: true });
}
