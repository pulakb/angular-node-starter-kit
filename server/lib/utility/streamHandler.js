var Tweet = require('../models/tweet');

module.exports = function (stream) {
    // when tweets get sent our way ...
    stream.on('data', function (data) {

        console.log("sss");

        // construct a new Tweet object
        var tweet = {
          twid: data['id'],
          active: false,
          author: data['user']['name'],
          avatar: data['user']['profile_image_url'],
          body: data['text'],
          date: data['created_at'],
          screenname: data['user']['screen_name']
        };

        // Create a new model instance with our object
        var tweetEntry = new Tweet(tweet);

        // Save it to the DB
        tweetEntry.save(function (err) {
            if (!err) {
                //socket.io emits the tweet

            }
        });
    });
};