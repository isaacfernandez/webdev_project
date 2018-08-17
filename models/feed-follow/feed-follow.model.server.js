var mongoose = require('mongoose');
var schema = require('./feed-follow.schema.server');
var model = mongoose.model('FeedFollowModel', schema);


function createFeedFollow(newFeedFollow) {
  return model.create(newFeedFollow);
}

function updateFeedFollow(idToUpdate, updatedFeedFollow) {
  return model.update({_id: idToUpdate}, {$set: updatedFeedFollow});
}

function deleteFeedFollowById(idToDelete) {
  return model.remove({_id: idToDelete});
}

function deleteFeedFollowByFeedAndFollower(feedId, followerId) {
  return model.remove({follower: followerId, feed: feedId});
}

function findFeedFollowById(idToFind) {
  return model.findById(idToFind);
}

function findFeedFollowByFeedAndFollower(feedId, followerId) {
  return model.find({follower: followerId, feed: feedId});
}

function findFeedFollowsForFeed(feedId) {
  return model.find({feed: feedId});
}

function findFeedFollowsOfFollower(followerId) {
  return model.find({follower: followerId});
}

function findAllFeedFollows() {
  return model.find();
}


module.exports = {
  createFeedFollow: createFeedFollow,
  updateFeedFollow: updateFeedFollow,
  deleteFeedFollowById: deleteFeedFollowById,
  deleteFeedFollowByFeedAndFollower: deleteFeedFollowByFeedAndFollower,
  findFeedFollowByFeedAndFollower: findFeedFollowByFeedAndFollower,
  findFeedFollowById: findFeedFollowById,
  findFeedFollowsForFeed: findFeedFollowsForFeed,
  findFeedFollowsOfFollower: findFeedFollowsOfFollower,
  findAllFeedFollows: findAllFeedFollows
};

