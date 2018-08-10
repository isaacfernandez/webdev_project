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

function findFeedFollowById(idToFind) {
  return model.findById(idToFind);
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
  findFeedFollowById: findFeedFollowById,
  findFeedFollowsForFeed: findFeedFollowsForFeed,
  findFeedFollowsOfFollower: findFeedFollowsOfFollower,
  findAllFeedFollows: findAllFeedFollows
};

