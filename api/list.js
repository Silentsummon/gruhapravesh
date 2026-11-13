import { list } from '@vercel/blob';

export default async function handler(req, res) {
  try {
    let blobs = [], cursor;
    do {
      const r = await list({ prefix: 'guests/', limit: 1000, cursor });
      blobs = blobs.concat(r.blobs); cursor = r.hasMore ? r.cursor : undefined;
    } while (cursor);
    blobs.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
    res.setHeader('Cache-Control', 's-maxage=20, stale-while-revalidate=60');
    res.status(200).json(blobs.map(b => ({ url: b.url, name: b.pathname.replace('guests/', ''), at: b.uploadedAt })));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
