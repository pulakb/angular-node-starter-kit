/**
 *
 */
'use strict';

var express = require('express'),
    generalRouter = express.Router(),
    generalProvider = require('../modules/general.js');


generalRouter.post('/contactus', function (req, res) {
    res.send("hello");
});

module.exports = generalRouter;