const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || user.password !== password) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true }); // Lưu token trong cookie
  res.redirect('/');
});

// Logout route
router.get('/logout', (req, res) => {
  res.clearCookie('token');  // Xóa cookie chứa token
  res.redirect('/');          // Chuyển hướng về trang chủ
});

router.get('/login', (req, res) => {
  res.render('login');
});

module.exports = router;
