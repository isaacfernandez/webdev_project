var mongoose = require('mongoose');


module.exports = mongoose.Schema({
  feed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'feed'
  },
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  followingSince: {
    type: Date,
    default: Date.now
  }
}, {collection: 'feed-follow'});



