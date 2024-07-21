var mongoose = require ('mongoose');
var LegoSchema = mongoose.Schema({
   name: String,
   quantity: Number,
   date: Date,
   image: String,
   price:Number,
   category: String,
   model: String,
   hot: String,
});
const LegoModel = mongoose.model('Lego', LegoSchema, 'Lego');

module.exports = LegoModel;