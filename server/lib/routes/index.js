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
router.get('/channels', function(req, res) {

    // Get the Collection Name set based on User
    var collectionName = req.app.get('collectionName');

    // Call getChannels method of rovi Module
    Provider.getChannels(collectionName, function (result) {
        res.json(result);
    });
});

// route with parameters (http://localhost:8080/epg/channels/:channelId)
router.get('/channels/:id', function (req, res) {

});

// route for programs (http://localhost:8080/epg/programs)
router.get('/programs', function(req, res) {

    // Get the Collection Name set based on User
    var collectionName = req.app.get('collectionName');

    // Get SourceId/ChannelId, userStartTime, userEndTime from the req object
    var sourceId = req.query.sourceId,
        userStartTime = req.query.userStartTime,
        userEndTime = req.query.userEndTime;

    // Call getChannels method of rovi Module
    Provider.getPrograms(collectionName, sourceId, userStartTime, userEndTime, function (result) {
        res.json(result);
    });
});

module.exports = router;