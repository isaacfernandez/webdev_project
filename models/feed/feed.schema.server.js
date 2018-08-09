var mongoose = require('mongoose');


module.exports = mongoose.Schema({
  feedName: String,
  posts: String,
  feedFollows: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'feed-follow'
  }]
}, {collection: 'feed'});



