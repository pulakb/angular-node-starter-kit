'use strict';

// Call the packages and define app using express
var express = require('express'),
	bodyParser = require('body-parser'),
	config = require('./config/config.js'),
  routes = require('./lib/routes/'),
	cors = require('cors'),
	morgan = require('morgan'),
	Err = require('custom-err'),
	app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Logger
app.use(morgan('combined'));

// Cross-origin
app.use(cors());

// Set server port
app.set('port', process.env.PORT || 8000);

// Set server port
app.set('env', 'DEVELOPMENT');

var ENV = app.get('env');

// Set Routers

app.use('/', routes);

/// error handlers

// development error handler
// will print stacktrace
if (ENV === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;