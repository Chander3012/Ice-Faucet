require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const pointsRoutes = require('./routes/points'); // Add the points routes
const jwt = require('jsonwebtoken'); // Add missing JWT import

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware to verify JWT and set user to req.user
app.use('/api/auth', authRoutes);  // Authentication Routes (login/register)
app.use('/api/points', pointsRoutes);  // Points Routes (add/get points)

// Global error handler for invalid routes or missing resources
app.use((req, res, next) => {
  const error = new Error('Route not found');
  error.status = 404;
  next(error);
});

// Error handling middleware for all routes
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
