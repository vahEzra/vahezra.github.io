export default function handler(req, res) {
  // Check if method is POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ 
      error: `Method ${req.method} Not Allowed` 
    });
  }

  // Verify content-type is application/json
  const contentType = req.headers['content-type'];
  if (!contentType || !contentType.includes('application/json')) {
    return res.status(415).json({ 
      error: 'Content-Type must be application/json' 
    });
  }

  try {
    // Parse body
    const { content, endpoint } = req.body;

    // Validate required fields exist
    if (content === undefined || endpoint === undefined) {
      return res.status(400).json({ 
        error: 'Missing required fields. Must include "content" and "endpoint"' 
      });
    }

    // Validate field types
    if (typeof content !== 'string' || typeof endpoint !== 'number') {
      return res.status(400).json({ 
        error: 'Invalid field types. "content" must be string, "endpoint" must be number' 
      });
    }

    // Check if content contains HTML error codes (400-599 range)
    const htmlErrorPattern = /<[^>]*status\s*=\s*["']?(4[0-9]{2}|5[0-9]{2})["']?/i;
    if (htmlErrorPattern.test(content)) {
      return res.status(400).json({ 
        error: 'Content appears to contain HTML error status codes' 
      });
    }

    // Process the data
    console.log(`Content: ${content} | Endpoint: ${endpoint}`);

    return res.status(200).json({ 
      success: true, 
      message: 'Data received successfully',
      data: { content, endpoint } 
    });

  } catch (err) {
    console.error('API Error:', err);
    return res.status(500).json({ 
      error: 'Internal Server Error',
      message: err.message 
    });
  }
}
