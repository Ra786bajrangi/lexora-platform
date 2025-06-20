const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  name: {
    type: String,
    trim: true,
    default: ''
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'is invalid']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
   avatar: {
    type: String,
    default: '/default-avatar.png' // fallback avatar
  },
  bio: {
    type: String,
    maxlength: 200,
    default: 'Passionate writer.' // you can customize
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // restrict to only these two
    default: 'user'          // default is 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
  type: Boolean,
  default: true
}

});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
