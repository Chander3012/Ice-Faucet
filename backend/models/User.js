const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  points: { type: Number, default: 0 },
  referrer: { type: String, default: null }, // For storing referrer username

  // Optional: array of redemption references if you want to populate later
  withdrawals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Redemption',
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
