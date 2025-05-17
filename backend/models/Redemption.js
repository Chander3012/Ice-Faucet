
const mongoose = require('mongoose');

const redemptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pointsRedeemed: { type: Number, required: true },
  redeemedAt: { type: Date, default: Date.now },
  // Optional: add more fields here if needed (e.g., transactionId, status)
});

module.exports = mongoose.model('Redemption', redemptionSchema);
