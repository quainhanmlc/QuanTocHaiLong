var mongoose = require ('mongoose');
var roboSchema = mongoose.Schema({
   name: String,
   quantity: Number,
   price: Number,
   date: Date,
   image: String,
   category: String,
   model: String,
   hot: String,
});
const roboModel = mongoose.model('Robo', roboSchema, 'Robo');

module.exports = roboModel;