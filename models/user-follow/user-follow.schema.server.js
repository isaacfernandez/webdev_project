var mongoose = require('mongoose');


module.exports = mongoose.Schema({
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  followed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  followingSince: {
    type: Date,
    default: Date.now
  }
}, {collection: 'user-follow'});



