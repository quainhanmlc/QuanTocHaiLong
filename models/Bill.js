const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  serviceName: { type: String, required: true },
  serviceCode: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  discountPercentage: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  store: { type: String, required: true }
});

const Bill = mongoose.model('Bill', billSchema, 'Bill');

module.exports = Bill;
