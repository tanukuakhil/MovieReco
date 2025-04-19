const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/genres', async (req, res) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch genres' });
  }
});

module.exports = router;
