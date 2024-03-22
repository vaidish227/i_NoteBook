const express = require("express");
const router = express.Router();
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

const JWT_SECRET = "HAHAHAHA";

//Create a user using:  POST "/api/auth/createuser". No login required
router.post('/createuser',[
    body('name').isLength({min:3}),
    body('email').isEmail(),
    body('password').isLength({min:5})
], async(req,res)=>{
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
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
      const authTooken = jwt.sign(data,JWT_SECRET);
      //console.log(jwtData);
    //res.json(user)
      res.json({authTooken})
} catch (error) {
        console.log(error.message);
        res.status(500).send('some error occured')
}
})

module.exports = router;