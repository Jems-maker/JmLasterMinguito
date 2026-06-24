// Vercel Serverless Function — /api/views
// Uses Vercel KV (free tier) for persistent view counting

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

  try {
    // Vercel KV is available via @vercel/kv when KV store is linked
    const { kv } = await import('@vercel/kv');

    if (req.method === 'POST') {
      // Increment and return new count
      const count = await kv.incr('portfolio:views');
      return res.status(200).json({ count });
    } else {
      // GET — return current count without incrementing
      const count = (await kv.get('portfolio:views')) || 0;
      return res.status(200).json({ count });
    }
  } catch (err) {
    // KV not configured — return 0 gracefully
    return res.status(200).json({ count: 0, error: 'KV not configured' });
  }
}
