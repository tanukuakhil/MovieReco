const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Add movie to watchlist
router.post('/add', async (req, res) => {
  const { userId, movie } = req.body;

  // Check for missing parameters
  if (!userId || !movie || !movie.id) {
    return res.status(400).json({ error: 'userId and movie details are required' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the movie already exists in the watchlist
    if (user.watchlist.find(item => item.id === movie.id)) {
      return res.status(400).json({ error: 'Movie already in watchlist' });
    }

    // Add movie to the watchlist
    user.watchlist.push(movie);
    await user.save();
    res.json({ message: 'Movie added to watchlist' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add to watchlist' });
  }
});

// Get watchlist
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  // Check if userId is valid
  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user.watchlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch watchlist' });
  }
});

// Remove movie from watchlist
router.delete('/remove', async (req, res) => {
  const { userId, movieId } = req.body;

  // Check for missing parameters
  if (!userId || !movieId) {
    return res.status(400).json({ error: 'userId and movieId are required' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Remove movie from the watchlist
    const movieIndex = user.watchlist.findIndex(movie => movie.id === movieId);
    if (movieIndex === -1) {
      return res.status(404).json({ error: 'Movie not found in watchlist' });
    }

    user.watchlist.splice(movieIndex, 1);
    await user.save();
    res.json({ message: 'Movie removed from watchlist' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to remove from watchlist' });
  }
});

module.exports = router;
