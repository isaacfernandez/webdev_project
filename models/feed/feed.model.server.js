var mongoose = require('mongoose');
var schema = require('./feed.schema.server');
var model = mongoose.model('FeedModel', schema);


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

function findFeedById(idToFind) {
  return model.findById(idToFind);
}

function findAllFeeds() {
  return model.find();
}

function getInternalPosts(feedId, quantity) {
  return model.findById(feedId).populate('internalPosts');//.externalPosts.limit(quantity);
}

function getExternalPosts(feedName, quantity) {
  return model.find({feedName: feedName}).populate('externalPosts');//.externalPosts.limit(quantity);
}

function addInternalPost(feedId, postId) {
  return model.update({_id: feedId}, {$push: {internalPosts: postId}});
}

function addExternalPost(feedId, postId) {
  return model.update({_id: feedId}, {$push: {externalPosts: postId}});
}

function addFeedFollow(feedId, followId) {
  return model.update({_id: feedId}, {$push: {feedFollows: followId}});
}


module.exports = {
  createFeed: createFeed,
  updateFeed: updateFeed,
  deleteFeedById: deleteFeedById,
  findFeedByName: findFeedByName,
  findFeedById: findFeedById,
  findAllFeeds: findAllFeeds,
  getInternalPosts: getInternalPosts,
  getExternalPosts: getExternalPosts
};

