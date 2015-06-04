'use strict';

var express = require('express');
var router = express.Router();

/*
 * */

var Provider = require('../modules/');

 router.get('/', function(req, res) {

 });

// route
router.post('/registration', function(req, res) {

});

//User will log in using email and password. So during registration email can't be duplicated.
router.post('/registration/check/email', function(req, res) {

});

// route
router.get('/logout', function (req, res) {

});

// route
router.get('/login', function(req, res) {


});

module.exports = router;