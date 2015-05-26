'use strict';

var express = require('express');
var router = express.Router();

/* Make a call to rovi class which functions to interact with Rovi Model
 * to get the data.
 * Once data is returned from the rovi class's function, send that data
 * to client side
 * */

var Provider = require('../modules/');

 router.get('/', function(req, res) {

 });

// route without parameters (http://localhost:8080/epg/channels/)
router.get('/signUp', function(req, res) {

});

// route with parameters (http://localhost:8080/epg/channels/:channelId)
router.get('/signOut', function (req, res) {

});

// route for programs (http://localhost:8080/epg/programs)
router.get('/signIn', function(req, res) {


});

module.exports = router;