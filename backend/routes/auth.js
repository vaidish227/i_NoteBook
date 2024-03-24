const express = require("express");
const router = express.Router();
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "HAHAHAHA";

// Route 1: Create a user using:  POST "/api/auth/createuser". No login required
router.post('/createuser',[
    body('name').isLength({min:3}),
    body('email').isEmail(),
    body('password').isLength({min:5})
], async(req,res)=>{
  let success = false;
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
   
    //check weather the user exists already
    try {
        
   let user = await User.findOne({email:req.body.email});
   console.log(user)
   if(user){
    return res.status(400).json({error:"sorry a user with this email already exists"})
   }

   const salt = await bcrypt.genSalt(10);
   const secPass = await bcrypt.hash( req.body.password, salt)
   //Create a new user
     user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data ={
        id: user.id
      }
      const authToken = jwt.sign(data,JWT_SECRET);
      success = true;
      //console.log(jwtData);
    //res.json(user)
      res.json({success,authToken})
} catch (error) {
        console.log(error.message);
        res.status(500).send('internal server error')
}
})

// Route 2: Authenticate a user using:  POST "/api/auth/createuser". No login required

router.post('/login',[
  body('email', 'Enter a valid eamil').isEmail(),
  body('password', 'Password can nnot be blank').exists(),
], async(req,res)=>{
   //Finds the validation errors in this request and wraps them in an object with handy functions
   let success = false 
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body
    try {
      let user = await User.findOne({email});
      if(!user){
        return res.status(400).json({success,error:"Please try to login with correct credentials"})
      }

      const passwordCompare = await bcrypt.compare(password,user.password);
      if(!passwordCompare){
        return res.status(400).json({success,error:"Please try to login with correct credentials"})
      }

      const data ={
        user: {
          id: user.id
      }
      }
      success = true;
      const authToken = jwt.sign(data,JWT_SECRET);
      res.json({success, authToken})
    } catch (error) {
      console.log(error.message);
        res.status(500).send('internal server error')
    }
}
)

// Route 3: Get logged in  user details using:  POST "/api/auth/getuser". login required
router.post('/getuser', fetchuser, async(req,res)=>{
try {
  const userId = req.user.id;
  const user = await User.findById(userId).select("-password")
  res.send(user);
} catch (error) {
  console.log(error.message);
  res.status(500).send('internal server error')
}
})

module.exports = router;