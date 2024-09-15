const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = process.env.JWT_SECRET;

//  Route 1 : create a new user
router.post("/createuser", async (req, res) => {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10); // Added for salting the password
    // Hash the password with the salt**
    const hashedPassword = await bcrypt.hash(req.body.password, salt); // Added for hashing the password

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      age: req.body.age,
    });

    const savedUser = await newUser.save();

    // Generate a JWT token**
    const token = jwt.sign({ id: savedUser._id }, JWT_SECRET,)

    res.status(201).json({ savedUser, token }); // Send back the created user and token with a 201 status**
  } catch (err) {
    res.status(400).json({ error: err.message }); // Handle any errors
  }
});


//  Route 2 : login a existing user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "incorrect email" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: "incorrect password" });
    }
    // returning auth token if user credentials are correct

    const id = user._id;
    const authToken = jwt.sign({ id }, JWT_SECRET,);
    

    res.json({ authToken });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("some internal error occured");
  }
});


// Route 3 : Get loggedin  user details using: Post "/api/auth/getuser"   Login required
router.get('/getuser',fetchuser,async (req,res)=>{
  try {
   
   const userid = req.user.id;
    const user = await User.findById(userid).select('-password')
    res.send(user)
    
  } catch (error) {
    console.log(error.message)
    res.status(500).send("some internal error occured")
    
  }
  })
module.exports = router;
