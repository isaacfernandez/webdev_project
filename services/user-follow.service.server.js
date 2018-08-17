
module.exports = function(app) {

  app.post('/api/user/:userId/follows/:followedId', followUser);
  app.get('/api/user/:userId/follows/:quantity', getFollows);
  app.get('/api/user/:userId/follower/:quantity', getFollowers);
  app.get('/api/user/:userId/isFollowing/:followingId', isFollowing);
  app.delete('/api/user/:userId/follows/:followedId', unfollowUser);

  var userFollowModel = require('../models/user-follow/user-follow.model.server');
  // schema: follower, followed, followingSince

  function followUser(req, res) {
    newFollow = {
      follower: req.params['userId'],
      followed: req.params['followedId']
    };
    userFollowModel.createUserFollow(newFollow)
      .then(function(response) {
        res.send(response);
      });
  }

  function getFollows(req, res) {
    
  }

  function getFollowers(req, res) {
    
  }

  function isFollowing(req, res) {
    
  }

  function unfollowUser(req, res) {
    
  }

}




