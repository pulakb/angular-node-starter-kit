/**
 * In our app we use Mongoose to define our Tweet model. When receiving our data
 * from our Twitter stream, we need somewhere to store it, and a static query method
 * to return subsets of data based upon app parameters:
 *
 *
 *
 * After defining our schema, we create a static method called getTweets. It takes 3 arguments, page, skip & callback.

 * When we have an application that not only renders server side, but has an active stream saving to the database
 behind the scenes, we need to create a way to make sure that when we request our next page of tweets, it takes
 into account that Tweets may have been added since the app has been running on the client.

 * This is where the skip argument comes into play. If we have 2 new tweets come in, and then request the next page,
 we need to skip 2 indexes forward so that our application’s pages are relative to it’s original count, and we
 don’t end up with duplicate tweets.
 */

var mongoose = require('mongoose');

// Create a new schema for our tweet data
var schema = new mongoose.Schema({
    twid       : String
    , active     : Boolean
    , author     : String
    , avatar     : String
    , body       : String
    , date       : Date
    , screenname : String
});

// Create a static getTweets method to return tweet data from the db
schema.statics.getTweets = function(page, skip, callback) {

};

// Return a Tweet model based upon the defined schema
module.exports = Tweet = mongoose.model('Tweet', schema);