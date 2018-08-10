var mongoose = require('mongoose');
var schema = require('./post.schema.server');
var model = mongoose.model('PostModel', schema);


function createPost(newPost) {
  return model.create(newPost);
}

function updatePost(idToUpdate, updatedPost) {
  return model.update({_id: idToUpdate}, {$set: updatedPost});
}

function deletePostById(idToDelete) {
  return model.remove({_id: idToDelete});
}

function findPostById(idToFind) {
  return model.findById(idToFind);
}

function findPostsByTitle(titleToFind) {
  return model.find({postTitle: titleToFind});
}

function findPostsByUser(userId) {
  return model.find({postingUser: userId});
}

function findPostsForFeed(feedId) {
  return model.find({feed: feedId});
}

function findAllPosts() {
  return model.find();
}


module.exports = {
  createPost: createPost,
  updatePost: updatePost,
  deletePostById: deletePostById,
  findPostById: findPostById,
  findPostsByTitle: findPostsByTitle,
  findPostsByUser: findPostsByUser,
  findPostsForFeed: findPostsForFeed,
  findAllPosts: findAllPosts
};
