/**
 *
 */
'use strict';

var express = require('express'),
    twitterRouter = express.Router(),
    Tweet = require('../models/tweet');


twitterRouter.get('/', function (req, res) {

});

module.exports = twitterRouter;