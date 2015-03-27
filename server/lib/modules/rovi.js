/*
 * Include Model for Rovi. This Rovi Model will interact with MongoDB for getting
 * data.
  */

function rovi() {}

// Returns the list of channels as a JSON
rovi.prototype.getChannels = function () {
    return '{"name": "pulak"}';
};

// Returns the program information of a single or all channels
rovi.prototype.getPrograms = function (channelArr) {
    return "getPrograms";
};

module.exports = new rovi();
