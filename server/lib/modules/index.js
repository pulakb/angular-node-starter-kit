/*
 * Include Model for Rovi. This Rovi Model will interact with MongoDB for getting
 * data.
 *
 * After receiving data from DB Collection, it will be returned to Client
  */
'use strict';

var Model = require('../models/');

function Provider () {}

// Returns the list of channels as a JSON
Provider.prototype.getChannels = function (collectionName, callback) {

    //Call findAll with a callback to RoviProvider in Models
    Model.findAll(collectionName, callback);
};

// Returns a particular channel's details
Provider.prototype.getChannelById = function (id, callback) {

};

// Returns the program information of a single or all channels
Provider.prototype.getPrograms = function (collectionName,  sourceId, userStartTime, userEndTime, callback) {

    //
    Model.findPrograms(collectionName, sourceId, userStartTime, userEndTime, callback);
};

module.exports = new Provider();
