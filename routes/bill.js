const express = require('express');
const router = express.Router();
const Bill = require('../models/Bill');
const auth = require('../middlewares/auth');

// Get all bills
router.get('/', auth(['admin', 'manager']), async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? {} : { store: req.user.store };
    const bills = await Bill.find(query);
    res.render('billList', { bills: bills, user: req.user });
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

// Delete a bill (admin only)
router.get('/delete/:id', auth(['admin']), async (req, res) => {
  try {
    await Bill.findByIdAndDelete(req.params.id);
    res.redirect('/bills');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
