// api/post.js
module.exports = (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { body } = req; // Get the JSON payload from the request
  console.log('Received:', body);

  // Example response
  res.status(200).json({
    message: 'POST request received',
    receivedData: body
  });
};
