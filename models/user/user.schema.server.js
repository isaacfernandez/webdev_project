var mongoose = require('mongoose');


module.exports = mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  dateOfBirth: {
    type: Date,
    default: Date.now
  },
  userFollows: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user-follow'
  }],
  feedFollows: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'feed-follow'
  }],
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post'
  }]
}, {collection: 'user'});



