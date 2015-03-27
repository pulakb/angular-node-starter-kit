"use strict";

var express = require('express');
var router = express.Router();

/* Make a call to rovi class which functions to interact with Rovi Model
 * to get the data.
 * Once data is returned from the rovi class's function, send that data
 * to client side
 * */

var roviObj = require('../modules/rovi.js');

 router.get('/', function(req, res) {
    var x = roviObj.getChannels();
    res.json(x);
 });

router.get('/channels', function(req, res) {

    res.send("channels");
});

router.get('/programs', function(req, res) {
    //console.log(req.query.name);
    res.send("programs");
});

module.exports = router;