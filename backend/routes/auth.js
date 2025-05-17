const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Default value for testing

// Register Route
router.post('/register', async (req, res) => {
  const { username, email, password, referralCode } = req.body;
  
  try {
    // Check if the user already exists
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already exists' });

    // Hash the password
    const hashed = await bcrypt.hash(password, 10);

    // If there's a referral code, find the user who referred the new user
    let referredBy = null;
    if (referralCode) {
      const referrer = await User.findOne({ referralCode });
      if (referrer) {
        referredBy = referrer._id;
        // Add the new user to the referrer's referrals array
        referrer.referrals.push(referrer._id); // Updated here
        await referrer.save();
      }
    }

    const user = new User({
      username,
      email,
      password: hashed,
      referredBy,
    });

    await user.save();

    // If a user referred them, update the referrals list for the referrer
    if (referredBy) {
      const referrer = await User.findById(referredBy);
      referrer.referrals.push(user._id);
      await referrer.save();
    }

    // Send a response
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Compare the password with the hashed password in the database
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate the JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    // Send the response with the token and user info (excluding the password)
    res.json({ token, user: { id: user._id, username: user.username, points: user.points } });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify Token Route
router.get('/verify', async (req, res) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(400).json({ message: 'Token missing' });

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password'); // Exclude password field

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Send back the user information
    res.status(200).json({ user });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Add points to user Route
router.post('/points/add', async (req, res) => {
  const { points } = req.body;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(400).json({ message: 'Token missing' });

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Add points to the user's account
    user.points += points;
    await user.save();

    // Send back the updated points
    res.status(200).json({ message: 'Points added successfully', updatedPoints: user.points });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: 'Server error' });
  }
});

// Referrals Route
router.get('/referrals', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) return res.status(400).json({ message: 'Token missing' });

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).populate('referrals', 'username email'); // Populate referrals with username and email

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Send the list of referrals for the user
    res.status(200).json({ referrals: user.referrals });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;
