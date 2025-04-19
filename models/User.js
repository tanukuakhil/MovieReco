const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  searchHistory: [String],
  watchlist: [{
    id: String,
    title: String,
    poster_path: String,
    genre_ids: [Number]
  }]
});

module.exports = mongoose.model('User', userSchema);
