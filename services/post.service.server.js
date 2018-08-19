
module.exports = function(app) {

  app.post('/api/post/:feedId', requireLoggedIn, postToFeed);
  app.put('/api/post/:postId', requireModerator, updatePost);
  app.delete('/api/post/:postId', requireModerator, deletePost);
  app.get('/api/post/:postId', getPost);

  var postModel = require('../models/post/post.model.server');

  // postTitle, postLink, postingUser (id), feed (id)
  // must be logged in
  function postToFeed(req, res) {
    postModel.createPost({
      postTitle: req.body.postTitle,
      postLink: req.body.postLink,
      postingUser: req.session['currentUser']._id,
      feed: req.params['feedId']
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

  function deletePost(req, res) {
    postModel.deletePostById(req.params['postId'])
      .then(function(response) {
        res.send(response);
      });
  }

  function getPost(req, res) {
    postModel.findPostById(req.params['postId'])
      .then(function(response) {
        res.send(response);
      });
  }

}
