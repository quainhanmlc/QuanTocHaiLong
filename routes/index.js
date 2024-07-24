const express = require('express');
const router = express.Router();
const Bill = require('../models/Bill');

/* GET home page. */
router.get('/', async (req, res) => {
  try {
    const bills = await Bill.find();
    res.render('index', { bills: bills });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
