require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('./app_api/models/db');
require('./app_api/models/user');

var apiRouter = require('./app_api/routes/index');

// Wire in our authentication module
var passport = require('passport');
require('./app_api/config/passport');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

// Allowed origins for the frontends that consume this API:
// - localhost:5173: React + Vite public site (apps/public)
// - localhost:5174: React + Vite admin dashboard (apps/admin)
const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:5174',
];

app.use('/api', (req, res, next) => {
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Catch unauthorized error and create 401
app.use((err, req, res, next) => {
  if(err.name === 'UnauthorizedError') {
    return res
      .status(401)
      .json({"message": err.name + ": " + err.message});
  }
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ message: err.message });
});

module.exports = app;
