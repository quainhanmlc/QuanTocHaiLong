var express = require('express');
const roboModel = require('../models/RoboModel');
var router = express.Router();

router.get('/', async (req, res) => {
   var robos = await roboModel.find();
   res.render('robo/robo', { robos: robos });
});

router.get('/delete/:id', async (req, res) => {
   var id = req.params.id;
   await roboModel.findByIdAndDelete(id);
   var robos = await roboModel.find();
   res.render('robo/robo', {robos: robos});
});

router.get('/add', (req, res) => {
   res.render('robo/roboAdd');
});

router.post('/add', async (req, res) => {
   var robos = req.body;
   await roboModel.create(robos)
      .then(console.log('Add toy successfully !'))
      .catch(err => console.log(err));
   res.redirect('/robo');
});

router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var robo = await roboModel.findById(id);
   res.render('robo/roboEdit', { robo : robo });
});

router.post('/edit/:id', async (req, res) => {
   await roboModel.findByIdAndUpdate(req.params.id, req.body)
      .then(console.log('Edit toy successfully !'))
      .catch(err => console.log(err));
  res.redirect('/robo');
});

module.exports = router;