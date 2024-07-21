var express = require('express');
const LegoModel = require('../models/LegoModel');
var router = express.Router();

router.get('/', async (req, res) => {
   var legos = await LegoModel.find();
   res.render('lego/lego', { legos: legos });
});

router.get('/delete/:id', async (req, res) => {
   var id = req.params.id;
   await LegoModel.findByIdAndDelete(id);
   var legos = await LegoModel.find();
   res.render('lego/lego', {legos: legos});
});

router.get('/add', (req, res) => {
   res.render('lego/legoAdd');
});

router.post('/add', async (req, res) => {
   var legos = req.body;
   await LegoModel.create(legos)
      .then(console.log('Add toy successfully !'))
      .catch(err => console.log(err));
   res.redirect('/lego');
});

router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var lego = await LegoModel.findById(id);
   res.render('lego/legoEdit', { lego : lego });
});

router.post('/edit/:id', async (req, res) => {
   await LegoModel.findByIdAndUpdate(req.params.id, req.body)
      .then(console.log('Edit toy successfully !'))
      .catch(err => console.log(err));
  res.redirect('/lego');
});

module.exports = router;