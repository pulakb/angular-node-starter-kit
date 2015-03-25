"use strict";

var express = require('express');
var router = express.Router();
var config = require('./config/config.js'),

/* home page. */
router.get('/', function(req, res) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendfile('index.html', { root: config.server.distFolder });
});

module.exports = router;