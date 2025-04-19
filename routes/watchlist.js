const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Add movie to watchlist
router.post('/add', async (req, res) => {
  const { userId, movie } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user.watchlist.find(item => item.id === movie.id)) {
      user.watchlist.push(movie);
      await user.save();
    }
    res.json({ message: 'Movie added to watchlist' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add to watchlist' });
  }
});

// Get watchlist
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user.watchlist);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch watchlist' });
  }
});

// Remove movie from watchlist
router.delete('/remove', async (req, res) => {
  const { userId, movieId } = req.body;
  try {
    const user = await User.findById(userId);
    user.watchlist = user.watchlist.filter(movie => movie.id !== movieId);
    await user.save();
    res.json({ message: 'Movie removed from watchlist' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove from watchlist' });
  }
});

module.exports = router;
