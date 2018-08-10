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
  return model.findOne({feedName: feedName});
}

function findFeedById(idToFind) {
  return model.findById(idToFind);
}

function findAllFeeds() {
  return model.find();
}


module.exports = {
  createFeed: createFeed,
  updateFeed: updateFeed,
  deleteFeedById: deleteFeedById,
  findFeedByName: findFeedByName,
  findFeedById: findFeedById,
  findAllFeeds: findAllFeeds
};

