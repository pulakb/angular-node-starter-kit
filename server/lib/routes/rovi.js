'use strict';

var express = require('express');
var router = express.Router();

/* Make a call to rovi class which functions to interact with Rovi Model
 * to get the data.
 * Once data is returned from the rovi class's function, send that data
 * to client side
 * */

var RoviProvider = require('../modules/rovi.js');

 router.get('/', function(req, res) {

 });

router.get('/channels', function(req, res) {

    // Call getChannels method of rovi Module
    RoviProvider.getChannels(function (result) {
        res.json(result);
    });
});

// route with parameters (http://localhost:8080/channels/:channelId)
router.get('/channels/:id', function (req, res) {

});

router.get('/programs', function(req, res) {
    //console.log(req.query.name);
    res.send("programs");
});

module.exports = router;