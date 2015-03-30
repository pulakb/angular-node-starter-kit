'use strict';

/**
 * Include the config file and required MongoDB package
 * */
var config      = require('../../config/config.js'),
    MongoClient = require('mongodb').MongoClient,
    Server      = require('mongodb').Server,
    ObjectID    = require('mongodb').ObjectId,
    mongoHost   = config.server.mongoHost,
    mongoPort   = config.server.mongoPort,
    DB          = config.server.DB,
    collectionName = config.server.roviCollection;

var RoviModel = function (host, port) {

    var self = this;

    // Set up the connection to the local db
    var mongoclient = new MongoClient(new Server("localhost", 27017), {native_parser: true});

    // Open the connection to the server
    mongoclient.open(function(err, MONGOCLIENT) {
        if (!MONGOCLIENT) {
            console.error("Error! Exiting... Must start MongoDB first");
        }

        // Keep the database reference in a property
        self.db = MONGOCLIENT.db(DB);
    });
};

RoviModel.prototype.getCollection = function(callback) {
    this.db.collection(collectionName, function(error, rovi_collection) {
        if( error ) {
            callback(error);
        } else {
            callback(null, rovi_collection);
        }
    });
};

RoviModel.prototype.findAll = function (callback) {
    this.getCollection(function (error, rovi_collection) {
        if (error) {
            callback(error);
        } else {
            rovi_collection.find().toArray( function (error, results) {
                if (error) {
                    callback(error);
                } else {
                    callback(results);
                }
            });
        }
    });
};

RoviModel.prototype.findById = function (id, callback) {
  this.getCollection(function (error, rovi_collection) {
      if (error) {
          callback(error);
      } else {
          rovi_collection.findOne({_id: rovi_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function (error, result) {
            if (error) {
                callback(error);
            } else {
                callback(result);
            }
          });
      }
  });
};


module.exports = new RoviModel(mongoHost, mongoPort);