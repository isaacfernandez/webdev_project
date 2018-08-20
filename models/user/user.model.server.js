var mongoose = require('mongoose');

var feedFollowSchema = require('../feed-follow/feed-follow.schema.server');
var feedSchema = require('../feed/feed.schema.server');
var postSchema = require('../post/post.schema.server');
var userFollowSchema = require('../user-follow/user-follow.schema.server');
var userSchema = require('../user/user.schema.server');

var model = mongoose.model('UserModel', userSchema);


function findUserByCredentials(creds) {
  return model.findOne(creds);
}

function findUserByUsername(username) {
  return model.findOne({username: username});
}

function findUserById(idToFind) {
  return model.findById(idToFind);
}

function findUsersByUsername(stringMatch) {
  return model.find({'username': {'$regex': stringMatch, '$options': 'i'}});
}

function createUser(newUser) {
  return model.create(newUser);
}

function findAllUsers() {
  return model.find();
}

function deleteUserById(idToDelete) {
  return model.remove({_id: idToDelete});
}

function updateUser(user, idToUpdate) {
  return model.update({_id: idToUpdate}, {$set: user});
}

function addUserFollow(userId, userFollowId) {
  console.log('in addUserFollow');
  return model.update({_id: userId}, {$push: {userFollows: userFollowId}});
}

function addUserFollower(userId, userFollowerId) {
  console.log('in addUserFollower');
  return model.update({_id: userId}, {$push: {userFollowers: userFollowerId}});
}

function removeUserFollow(userId, userFollowId) {
  return model.update({_id: userId}, {$pull: {userFollows: userFollowId}});
}

function removeUserFollower(userId, userFollowerId) {
  return model.update({_id: userId}, {$pull: {userFollowers: userFollowerId}});
}

function addFeedFollow(userId, feedFollowId) {
  return model.update({_id: userId}, {$push: {feedFollows: feedFollowId}});
}

function removeFeedFollowById(userId, feedFollowId) {
  return model.update({_id: userId}, {$pull: {feedFollows: feedFollowId}});
}

function addPostToUser(userId, postId) {
  console.log('in addPostToUser (userModel)');
  return model.update({_id: userId}, {$push: {posts: postId}}, function(error){console.log(error);});
}

function removePostfromUser(userId, postId) {
  return model.update({_id: userId}, {$pull: {posts: postId}}, function(error){console.log(error);});
}

module.exports = {
  findUserByCredentials: findUserByCredentials,
  findUserByUsername: findUserByUsername,
  findUsersByUsername: findUsersByUsername,
  findUserById: findUserById,
  createUser: createUser,
  findAllUsers: findAllUsers,
  deleteUserById: deleteUserById,
  updateUser: updateUser,
  addUserFollow: addUserFollow,
  addUserFollower: addUserFollower,
  removeUserFollow: removeUserFollow,
  removeUserFollower: removeUserFollower,
  addFeedFollow: addFeedFollow,
  removeFeedFollowById: removeFeedFollowById,
  addPost: addPost,
  removePost: removePost
};

