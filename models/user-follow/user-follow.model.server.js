var mongoose = require('mongoose');
var schema = require('./user-follow.schema.server');
var model = mongoose.model('UserFollowModel', schema);


function createUserFollow(newUserFollow) {
  return model.create(newUserFollow);
}

function updateUserFollow(idToUpdate, updatedUserFollow) {
  return model.update({_id: idToUpdate}, {$set: updatedUserFollow});
}

function deleteUserFollowById(idToDelete) {
  return model.remove({_id: idToDelete});
}

function findUserFollowById(idToFind) {
  return model.findById(idToFind);
}

function findUserFollowsForFollowed(followedId) {
  return model.find({followed: followedId});
}

function findUserFollowsForFollower(followerId) {
  return model.find({follower: followerId});
}

function findAllUserFollows() {
  return model.find();
}


module.exports = {
  createUserFollow: createUserFollow,
  updateUserFollow: updateUserFollow,
  deleteUserFollowById: deleteUserFollowById,
  findUserFollowById: findUserFollowById,
  findUserFollowsForFollowed: findUserFollowsForFollowed,
  findUserFollowsForFollower: findUserFollowsForFollower,
  findAllUserFollows: findAllUserFollows
};

