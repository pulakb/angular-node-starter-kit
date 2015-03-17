var path = require('path');

module.exports = {
  mongo: {
    dbUrl: '',            // The base url of the MongoLab DB server
    apiKey: ''                 // Our MongoLab API key
  },
  security: {
    dbName: '',                                   // The name of database that contains the security information
    usersCollection: ''                            // The name of the collection contains user information
  },
  server: {
    listenPort: 3000,                                   // The port on which the server is to listen (means that the app is at http://localhost:3000 for instance)
    securePort: 8433,                                   // The HTTPS port on which the server is to listen (means that the app is at https://localhost:8433 for instance)
    distFolder: path.resolve(__dirname, '../client/dist'),  // The folder that contains the application files (note that the files are in a different repository) - relative to this file
    staticUrl: '/static',                               // The base url from which we serve static files (such as js, css and images)
  }
};