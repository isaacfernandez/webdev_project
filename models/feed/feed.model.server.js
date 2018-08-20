var mongoose = require('mongoose');

var feedFollowSchema = require('../feed-follow/feed-follow.schema.server');
var feedSchema = require('../feed/feed.schema.server');
var postSchema = require('../post/post.schema.server');
var userFollowSchema = require('../user-follow/user-follow.schema.server');
var userSchema = require('../user/user.schema.server');

var model = mongoose.model('FeedModel', feedSchema);

function createFeed(newFeed) {
  return model.create(newFeed);
}

function updateFeed(idToUpdate, updatedFeed) {
  return model.update({_id: idToUpdate}, {$set: updatedFeed});
}

function deleteFeedById(idToDelete) {
  return model.remove({_id: idToDelete});
}

function findFeedByName(feedName) {
  console.log('in the model findFeedByName');
  console.log(feedName);
  return model.findOne({feedName: feedName});
}

function findFeedsByName(stringMatch) {
  return model.find({'feedName': {'$regex': stringMatch, '$options': 'i'}})
}

function findFeedById(idToFind) {
  return model.findById(idToFind);
}

function findAllFeeds() {
  return model.find();
}

function getInternalPosts(feedName, quantity) {
  return model.find({feedName: feedName}).select({'internalPosts': 1});
}

function getExternalPosts(feedName, quantity) {
  return model.find({feedName: feedName}).select({'externalPosts': 1});
}

function addInternalPost(feedId, postId) {
  console.log('addInternalPost (feedModel)');
  return model.update({_id: feedId}, {$push: {internalPosts: postId}}, function(error){});
}

function addExternalPost(feedId, postId) {
  return model.update({_id: feedId}, {$push: {externalPosts: postId}}, function(error){console.log(error)});
}

function removeInternalPost(feedId, postId) {
  return model.update({_id: feedId}, {$pull: {internalPosts: postId}}, function(error){});
}

function removeExternalPost(feedId, postId) {
  return model.update({_id: feedId}, {$pull: {externalPosts: postId}}, function(error){});
}

function addFeedFollow(feedId, followId) {
  return model.update({_id: feedId}, {$push: {feedFollows: followId}});
}


module.exports = {
  createFeed: createFeed,
  updateFeed: updateFeed,
  deleteFeedById: deleteFeedById,
  findFeedByName: findFeedByName,
  findFeedsByName: findFeedsByName,
  findFeedById: findFeedById,
  findAllFeeds: findAllFeeds,
  getInternalPosts: getInternalPosts,
  getExternalPosts: getExternalPosts,
  addInternalPost: addInternalPost,
  addExternalPost: addExternalPost,
  removeInternalPost: removeInternalPost,
  removeExternalPost: removeExternalPost,
  addFeedFollow: addFeedFollow
};

