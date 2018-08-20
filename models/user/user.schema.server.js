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
  role: {
    type: String,
    enum: ['ADMIN', 'MODERATOR', 'USER'], // a USER is a creator and a follower
    default: 'USER'
  },
  userFollows: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user-follow'
  }],
  userFollowers: [{
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



