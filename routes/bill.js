const express = require('express');
const router = express.Router();
const Bill = require('../models/Bill');
const auth = require('../middlewares/auth');

// Get all bills
router.get('/', auth(['admin', 'manager']), async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? {} : { store: req.user.store };
    const bills = await Bill.find(query);
    res.render('billList', { bills: bills });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific bill
router.get('/:id', auth(['admin', 'manager']), async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) return res.status(404).json({ message: 'Bill not found' });
    if (req.user.role !== 'admin' && bill.store !== req.user.store) {
      return res.status(403).json({ message: 'You do not have access to this bill' });
    }
    res.render('billDetail', { bill: bill });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new bill
router.post('/', auth(['admin', 'manager']), async (req, res) => {
  try {
    const { serviceName, serviceCode, price, discountPercentage, totalPrice, store } = req.body;
    if (req.user.role !== 'admin' && req.user.store !== store) {
      return res.status(403).json({ message: 'You can only create bills for your own store' });
    }
    const bill = new Bill({ serviceName, serviceCode, price, discountPercentage, totalPrice, store });
    await bill.save();
    res.redirect('/bills');
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a bill
router.post('/edit/:id', auth(['admin']), async (req, res) => {
  try {
    const { serviceName, serviceCode, price, discountPercentage, totalPrice, store } = req.body;
    await Bill.findByIdAndUpdate(req.params.id, { serviceName, serviceCode, price, discountPercentage, totalPrice, store });
    res.redirect('/bills');
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a bill
router.get('/delete/:id', auth(['admin']), async (req, res) => {
  try {
    await Bill.findByIdAndDelete(req.params.id);
    res.redirect('/bills');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
