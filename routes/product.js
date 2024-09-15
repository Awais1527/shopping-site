const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchuser = require('../middleware/fetchuser');


// add a product 
// login required(todo)

router.post("/product" ,fetchuser, async(req,res) => {
try {

    const newProduct = new Product({
        name: req.body.name,
        price:req.body.price,
        description:req.body.description,
        imageUrl:req.body.imageUrl,
        type:req.body.type,
        created_by: req.user.id

    })
    const savedProduct = await newProduct.save();
    res.status(201).json({savedProduct})
    
} catch (error) {
    res.status(400).json({ error: error.message }); // Handle any errors
}
});




// Route to get all products
router.get("/getproducts", async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from the database
    res.status(200).json(products); // Send the products as a response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle any errors
  }
});




module.exports = router;