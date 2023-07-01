const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  profile: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    default: 'user'
  },
}, {
  timestamps: true,
  versionKey: false
})

const User = mongoose.model('User', userSchema);

module.exports = User;