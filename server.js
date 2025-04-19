const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');  // For serving static files
const watchlistRoutes = require('./routes/watchlist');  // Add watchlist routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Use the watchlist routes
app.use('/api/watchlist', watchlistRoutes);

// Serve static files for production
if (process.env.NODE_ENV === 'production') {
  // Set static folder for frontend build (adjust this to your actual folder structure)
  app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
} else {
  // In development, you might want to run something different or just return a basic message
  app.get('/', (req, res) => {
    res.send('API is running');
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
