const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// Get all services for the home page
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.render('index', { services: services, user: req.user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
