var mongoose = require('mongoose');


module.exports = mongoose.Schema({
  feedName: String,
  submittedPosts: [
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post'
  }],
  externalPosts: [
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post'
  }],
  feedFollows: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'feed-follow'
  }]
}, {collection: 'feed'});



