'use strict';

// Call the packages and define app using express
var express = require('express'),
	bodyParser = require('body-parser'),
	config = require('./config/config.js'),
    routes = require('./lib/routes/'),
	cors = require('cors'),
	morgan = require('morgan'),
	Err = require('custom-err'),
    path = require('path'),
    debug = require('debug'),
    router = express.Router(),
    methodOverride = require('method-override'),
	app = express();

// Parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({"extended": true}));

// simulate DELETE and PUT
app.use(methodOverride());

// Logger
app.use(morgan('dev'));

// Cross-origin
app.use(cors());

// Set server port
app.set('port', process.env.PORT || 8080);

// Set server port
app.set('env', 'DEVELOPMENT');

var ENV = app.get('env');

// Development error handler will print stacktrace
if (ENV === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// Production error handler no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Check for Rovi/Tribune User, set collection based on it
function validate (req, res, next) {
    /*
    * Extract the 'user' info from the URL
    * http://localhost:8080/epg/channels?user=rovi or
    * http://localhost:8080/epg/channels?user=tribune
    * */
    var user = req.query.user;

    if (user == "rovi") {
        app.set('collectionName', config.server.roviCollection);
    } else if (user == "tribune") {
        app.set('collectionName', config.server.tribuneCollection);
    }

    next();
}

// Set Routers
router.get('/', function (req, res) {
    res.send('Hello');
});

// Call the router
app.use('/', router);

// Call the Router
app.use('/epg/', validate, routes);

module.exports = app;