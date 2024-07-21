var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var legoRouter = require('./routes/lego');
var roboRouter = require('./routes/robo');
var app = express();
//body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
//mongoose
var mongoose = require('mongoose'); 
var uri = "mongodb+srv://ducddgch211224:ASM2_1644@cluster0.zoshmwr.mongodb.net/ATN";
//dateFormat & equal of hbs
var hbs = require('hbs');
mongoose.connect(uri)
.then(() => console.log('connect to db succeed'))
.catch(err => console.log(err));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/lego', legoRouter);
app.use('/robo', roboRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// port
app.listen(process.env.PORT || 3001);
module.exports = app;
