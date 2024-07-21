var express = require('express');
const LegoModel = require('../models/LegoModel');
const roboModel = require('../models/RoboModel');
var router = express.Router();

/* GET home page. */
router.get('/', async(req, res) => {
  var legos = await LegoModel.find();
  var robos = await roboModel.find();
  res.render('index', { legos: legos, robos: robos });
});
router.get('/legoPage', async (req, res) => {
  var legos = await LegoModel.find();
  res.render('legoPage', { legos: legos });
});
router.get('/detail/:id', async (req, res) => {
  var id = req.params.id;
  var legos = await LegoModel.findById(id);
  var robos = await roboModel.findById(id);
  if(robos){
    var products = robos;
  }else if(legos){
        var products = legos;
  } else {
    res.status(404).send("Not found");
  }
  res.render('detail', { products: products});
});
router.post('/detail/order/:id', async (req, res) => {
  var id = req.params.id;
  var legos = await LegoModel.findById(id);
  var robos = await roboModel.findById(id);
  if(robos){
    var products = robos;
  }else if(legos){
        var products = legos;
  } else {
    res.status(404).send("Not found");
  } 
  var price = products.price;
  var quantity = req.body.quantityInput;
  var total = quantity*price;
  res.render('order', { products: products, total: total});
});
router.get('/roboPage', async (req, res) => {
  var robos = await roboModel.find();
  res.render('roboPage', { robos: robos });
});
router.post('/search', async (req, res) => {
  var keyword = req.body.keyword;
  try {
    var legos = await LegoModel.find({
      $or: [
        { name: new RegExp(keyword, 'i') }
      ]
    });
    var robos = await roboModel.find({
      $or: [
        { name: new RegExp(keyword, 'i') }
      ]
    });
    res.render('index', { legos: legos, robos: robos }); 
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
