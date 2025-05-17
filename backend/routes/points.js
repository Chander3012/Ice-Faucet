const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Redemption = require('../models/Redemption');
const giftCards = require('../../client/src/Data/giftCards');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Middleware to authenticate user via JWT
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Authorization token missing' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// POST /api/points/add - Add points (for testing/admin)
router.post('/add', authenticate, async (req, res) => {
  const { points } = req.body;

  if (!points || isNaN(points) || Number(points) <= 0) {
    return res.status(400).json({ message: 'Invalid points value' });
  }

  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.points += Number(points);
    await user.save();

    res.status(200).json({ updatedPoints: user.points });
  } catch (err) {
    console.error('Error adding points:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/points/withdraw - Withdraw points manually
router.post('/withdraw', authenticate, async (req, res) => {
  const { points } = req.body;

  if (!points || isNaN(points) || Number(points) <= 0) {
    return res.status(400).json({ message: 'Invalid points value' });
  }

  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.points < Number(points)) {
      return res.status(400).json({ message: 'Insufficient points' });
    }

    user.points -= Number(points);
    await user.save();

    res.status(200).json({ updatedPoints: user.points });
  } catch (err) {
    console.error('Error withdrawing points:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/points/redeem - Redeem gift card
router.post('/redeem', authenticate, async (req, res) => {
  const { cardId } = req.body;

  if (!cardId) return res.status(400).json({ message: 'cardId is required' });

  const card = giftCards.find(c => c.id === cardId);
  if (!card) return res.status(404).json({ message: 'Invalid cardId' });

  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.points < card.requiredPoints) {
      return res.status(400).json({ message: 'Not enough points to redeem' });
    }

    user.points -= card.requiredPoints;

    const redemption = new Redemption({
      user: user._id,
      pointsRedeemed: card.requiredPoints,
      item: `${card.name} ${card.value}`,
      date: new Date(),
    });

    await redemption.save();
    user.withdrawals.push(redemption._id);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Points redeemed successfully',
      updatedPoints: user.points,
      redemptionId: redemption._id,
    });
  } catch (err) {
    console.error('Error redeeming points:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/points/redemptions - Get user redemption history
router.get('/redemptions', authenticate, async (req, res) => {
  try {
    const redemptions = await Redemption.find({ user: req.userId }).sort({ date: -1 });

    const formatted = redemptions.map(r => ({
      id: r._id,
      item: r.item,
      date: r.date.toISOString().split('T')[0],
    }));

    res.status(200).json({ redemptions: formatted });
  } catch (err) {
    console.error('Error fetching redemption history:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
