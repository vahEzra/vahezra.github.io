export default function handler(req, res) {
  // POST only
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Only accept application/json
  const contentType = req.headers['content-type'];
  if (!contentType || !contentType.includes('application/json')) {
    return res.status(415).json({ error: 'Content-Type must be application/json' });
  }

  try {
    const { content, endpoint } = req.body;

    // Validate fields
    if (typeof content !== 'string' || typeof endpoint !== 'number') {
      return res.status(400).json({ error: 'Invalid body. Must include "content" (string) and "endpoint" (number).' });
    }

    // Process the data (log, save, etc.)
    console.log(`Content: ${content} | Endpoint: ${endpoint}`);

    return res.status(200).json({ success: true, message: 'Data received', data: { content, endpoint } });
  } catch (err) {
    return res.status(500).json({ error: 'Server Error' });
  }
}
