var mongoose = require('mongoose');

var feedFollowSchema = require('../feed-follow/feed-follow.schema.server');
var feedSchema = require('../feed/feed.schema.server');
var postSchema = require('../post/post.schema.server');
var userFollowSchema = require('../user-follow/user-follow.schema.server');
var userSchema = require('../user/user.schema.server');

var model = mongoose.model('UserFollowModel', userFollowSchema);


function createUserFollow(newUserFollow) {
  return model.create(newUserFollow);
}

function updateUserFollow(idToUpdate, updatedUserFollow) {
  return model.update({_id: idToUpdate}, {$set: updatedUserFollow});
}

function deleteUserFollowById(idToDelete) {
  return model.remove({_id: idToDelete});
}

function deleteUserFollowByFollowerAndFollowed(follower, followed) {
  return model.remove({follower: follower, followed: followed});
}

function findUserFollowById(idToFind) {
  return model.findById(idToFind);
}

function doesUserFollowOther(userId, otherId) {
  return model.find({follower: userId, followed: otherId});
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
  deleteUserFollowByFollowerAndFollowed: deleteUserFollowByFollowerAndFollowed,
  findUserFollowById: findUserFollowById,
  doesUserFollowOther: doesUserFollowOther,
  findUserFollowsForFollowed: findUserFollowsForFollowed,
  findUserFollowsForFollower: findUserFollowsForFollower,
  findAllUserFollows: findAllUserFollows
};

