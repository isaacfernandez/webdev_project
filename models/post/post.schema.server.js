var mongoose = require('mongoose');


module.exports = mongoose.Schema({
  postTitle: String,
  postLink: String,
  postingUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  feed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'feed'
  }
}, {collection: 'post'});



