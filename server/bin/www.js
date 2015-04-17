var app = require('../app.js'),
    config = require('../config/config.js');

// START THE SERVER
// =============================================================================
app.listen(config.server.listenPort);

console.log('Magic happens on port ' + config.server.listenPort);