'use strict';

var express = require('express');
var router = express.Router();

/*
 * */

var Provider = require('../modules/');

 router.get('/', function(req, res) {

 });

// route
router.post('/signUp', function(req, res) {

});

//User will log in using email and password. So during registration email can't be duplicated.
router.post('/signUp/check/email', function(req, res) {

});

// route
router.get('/signOut', function (req, res) {

});

// route
router.get('/signIn', function(req, res) {


});

module.exports = router;