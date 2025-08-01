const express = require('express'),
  bcrypt = require('bcryptjs'),
  jwt = require('jsonwebtoken'),
  User = require('../models/User'),
  router = express.Router();

router.post('/signup', async (req,res)=>{
  const { name,email,password } = req.body;
  const hash = await bcrypt.hash(password,10);
  const u = await User.create({ name,email,passwordHash:hash });
  const token = jwt.sign({ id:u._id }, process.env.JWT_SECRET);
  res.json({ token, user:{ id:u._id,name,email } });
});

router.post('/login', async (req,res)=>{
  const { email,password } = req.body;
  const u = await User.findOne({ email });
  if(!u||!await bcrypt.compare(password,u.passwordHash))
    return res.status(400).json({ msg:'Bad creds' });
  const token = jwt.sign({ id:u._id }, process.env.JWT_SECRET);
  res.json({ token, user:{ id:u._id,name:u.name,email } });
});

module.exports = router;
