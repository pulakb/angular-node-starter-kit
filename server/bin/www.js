var pkg = require('../package.json'),
	debug = require('debug')(pkg.name + ':main'),
	app = require('../app');

var server = app.listen(app.get('port'), function () {
  debug('Express server listening on port ' + server.address().port);	
})	