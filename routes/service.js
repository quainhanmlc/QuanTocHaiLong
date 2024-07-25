const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const Bill = require('../models/Bill');
const auth = require('../middlewares/auth');

// Get all services
router.get('/', auth(['admin', 'manager']), async (req, res) => {
  try {
    const services = await Service.find();
    res.render('serviceList', { services: services, user: req.user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new service
router.get('/add', auth(['admin']), (req, res) => {
  res.render('serviceAdd');
});

router.post('/add', auth(['admin']), async (req, res) => {
  const { serviceName, price } = req.body;
  const service = new Service({ serviceName, price });
  try {
    await service.save();
    res.redirect('/services');
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Payment and create bill
router.get('/pay/:id', auth(['admin', 'manager']), async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    res.render('servicePay', { service: service, user: req.user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/pay/:id', auth(['admin', 'manager']), async (req, res) => {
  const { discountPercentage, store } = req.body;
  try {
    const service = await Service.findById(req.params.id);
    const totalPrice = service.price - (service.price * (discountPercentage / 100));
    const serviceCode = `SC${Math.floor(100000 + Math.random() * 900000)}`; // Tạo mã dịch vụ ngẫu nhiên
    const bill = new Bill({
      serviceName: service.serviceName,
      serviceCode: serviceCode,
      price: service.price,
      discountPercentage,
      totalPrice,
      store: req.user.role === 'admin' ? store : req.user.store // Nếu là admin thì chọn quán, nếu không thì theo quán của quản lý
    });
    await bill.save();
    res.redirect('/bills');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
