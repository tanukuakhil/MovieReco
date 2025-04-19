const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const watchlistRoutes = require('./routes/watchlist');  // Add watchlist routes

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use('/api/watchlist', watchlistRoutes);  // Use the watchlist routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
