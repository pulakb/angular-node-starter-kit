/*
 * Include Model for Rovi. This Rovi Model will interact with MongoDB for getting
 * data.
 *
 * After receiving data from DB Collection, it will be returned to Client
  */
'use strict';

var RoviModel = require('../models/rovi.js');

function RoviProvider () {}

// Returns the list of channels as a JSON
RoviProvider.prototype.getChannels = function (callback) {

    //Call findAll with a callback to RoviProvider in Models
    RoviModel.findAll(callback);
};

// Returns a particular channel's details
RoviProvider.prototype.getChannelById = function (id, callback) {

};

// Returns the program information of a single or all channels
RoviProvider.prototype.getPrograms = function (channelArr) {
    return "getPrograms";
};

module.exports = new RoviProvider();
