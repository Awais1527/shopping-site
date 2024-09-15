const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,  // Removes any extra spaces
  },
  email: {
    type: String,
    required: true,
    unique: true,  
    lowercase: true,  
    match: [/.+@.+\..+/, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,  
  },
  age: {
    type: Number,
    min: 0,  
  },
  createdAt: {
    type: Date,
    default: Date.now,  
  },
  isAdmin: { type: Boolean, default: false } 

});




const User = mongoose.model('User', userSchema);

module.exports = User;
