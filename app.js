require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const hbs = require('hbs');
require('./helpers'); // Đăng ký các helper

const indexRouter = require('./routes/index');
const billRouter = require('./routes/bill');
const authRouter = require('./routes/auth');
const serviceRouter = require('./routes/service');
const auth = require('./middlewares/auth');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://ducddgch211224:HaiLong2018@hailong2018.zzzrjno.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use('/auth', authRouter);
app.use('/', auth(['admin', 'manager']), indexRouter);
app.use('/bills', auth(['admin', 'manager']), billRouter);
app.use('/services', auth(['admin', 'manager']), serviceRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
