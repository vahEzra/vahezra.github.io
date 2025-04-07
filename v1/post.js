// post.js
module.exports = (req, res) => {
  if (req.method === 'POST') {
    const body = req.body;
    return res.status(200).json({
      message: 'Success',
      data: body
    });
  } else {
    return res.status(405).json({
      error: 'Oops! This endpoint only accepts POST requests. Please send a POST with a JSON body.'
    });
  }
};
