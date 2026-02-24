const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  verificationCode: { type: String },
  recoveryToken: { type: String },
  settings: {
    notifications: { type: Boolean, default: true },
    theme: { type: String, default: 'light' }
  }
});

module.exports = mongoose.model('User', userSchema);
