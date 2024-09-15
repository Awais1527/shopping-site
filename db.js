const mongoose = require('mongoose');


const connectDB = async () => {
    try {
      await mongoose.connect(`mongodb://0.0.0.0/personalwebsite`);
      console.log(`MongoDB Connected:`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }
  module.exports = connectDB;