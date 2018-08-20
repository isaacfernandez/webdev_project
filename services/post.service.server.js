
module.exports = function(app) {

  app.post('/api/post/:feedId', requireLoggedIn, postToFeed);
  app.put('/api/post/:postId', requireModerator, updatePost);
  app.delete('/api/post/internal/:postId', requireModerator, deleteInternalPost);
  app.delete('/api/post/external/:postId', requireModerator, deleteExternalPost);
  app.get('/api/post/:postId', getPost);
  app.get('/api/post/user/:userId', getPosts);

  var postModel = require('../models/post/post.model.server');
  var feedModel = require('../models/feed/feed.model.server');
  var userModel = require('../models/user/user.model.server');

  // postTitle, postLink, postingUser (id), feed (id)
  // must be logged in
  function postToFeed(req, res) {
    postModel.createPost({
      postTitle: req.body.postTitle,
      postLink: req.body.postLink,
      postingUser: req.session['currentUser']._id,
      feed: req.params['feedId']
    }).then(function(post) {
      return feedModel.addInternalPost(req.params['feedId'], post._id)
        .then(function(post) {
          return userModel.addPostToUser(post.postingUser, post._id)
        });
    }).then(function(response) {
      res.send(response);
    });
  }

  function updatePost(req, res) {
    var post = req.body;
    postModel.updatePost(req.params['postId'], post)
      .then(function(updatedPost) {
        res.send(updatedPost);
    });
  }

  function deleteInternalPost(req, res) {
    postModel.findPostById(req.params['postId'])
      .then(function(post) {
        postModel.deletePostById(post._id)
          .then(function(response) {
             return feedModel.removeInternalPost(post.feed, post._id)
               .then(function(response) {
                 userModel.removePostFromUser(post.postingUser, post._id);
               });
          });
      }).then(function(response) {
        res.send(response);
      });
  }

  function deleteExternalPost(req, res) {
    postModel.findPostById(req.params['postId'])
      .then(function(post) {
        postModel.deletePostById(post._id)
          .then(function(response) {
             return feedModel.removeExternalPost(post.feed, post._id)
               .then(function(response) {
                 userModel.removePostFromUser(post.postingUser, post._id);
               });
          });
      }).then(function(response) {
        res.send(response);
      });
  }


  function getPost(req, res) {
    postModel.findPostById(req.params['postId'])
      .then(function(response) {
        res.send(response);
      });
  }

  function getPosts(req, res) {
    postModel.findPostsByUser(req.params['userId'])
      .then(function(response) {
        res.send(response);
      });
  }

}

