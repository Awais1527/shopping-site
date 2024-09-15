const mongoose = require("mongoose");
const {Schema}= mongoose;

const productSchema = new mongoose.Schema({
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  created_At: {
    type: Date,
    default: Date.now,  
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
