var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const corsOption = require('./config/api/v1/corsOption');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var api1Router = require('./routes/api1');

const helmet = require('helmet');

require('dotenv').config();

var app = express();

app.use(helmet());
app.disable('x-powered-by');

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/api/v1', api1Router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;

  res.status(status).json({ message: message });
});

const startExpress = async () => {
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
};

const startMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB сервер запущений');
  } catch (err) {
    console.log('Помилка при запуску MongoDB серверу');
    setTimeout(() => {
      startMongoDB();
    }, 5000);
  }
};
const startServer = async () => {
  try {
    await startMongoDB();
    startExpress();
    console.log('API Server чекає на отримання запитів...');
  } catch (err) {
    console.log('Помилка при запуску сервера');
  }
};

startServer();

module.exports = app;
