const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  serviceName: { type: String, required: true },
  price: { type: Number, required: true }
});

const Service = mongoose.model('Service', serviceSchema, 'Service');

module.exports = Service;

