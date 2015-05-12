var path = require('path');

module.exports = {
  "server": {
    "listenPort": 8080,                                   // The port on which the server is to listen (means that the app is at http://localhost:3000 for instance)
    "securePort": 8433,                                   // The HTTPS port on which the server is to listen (means that the app is at https://localhost:8433 for instance)
    "distFolder": path.resolve(__dirname, '../../client/dist'),  // The folder that contains the application files (note that the files are in a different repository) - relative to this file
    "mongoHost" : 'localhost',
    "mongoPort"           : 27017,
    "DB"                  : 'CloudDB-WyPlay',
    "roviCollection"      : "rovi",
    "tribuneCollection"   : "tribune"
  },
  twitter: {
       consumer_key: 'g9xpOwRQvn1Yy5c2cOip28V2B',
       consumer_secret: 'hTP1CpviMHEJcdXpWUC8s44qHjOCAuqkpcZBKm3qtGb7Uo2GTi',
       access_token_key: '1122906733-oiqpR1vUWWxY5EMNCUzL4Jmnlfnq72400sBcm7k',
       access_token_secret: 'DK0Ql7QFlzFfqOhnEOgrZeQSXXMFGtLbKfQyUJdC2BVmG'
  }
};