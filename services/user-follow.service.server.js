
module.exports = function(app) {

  app.post('/api/user/:userId/follows/:followedId', followUser);
  app.get('/api/user/:userId/follows/:quantity', getFollows);
  app.get('/api/user/:userId/follower/:quantity', getFollowers);
  app.get('/api/user/:userId/isFollowing/:followingId', isFollowing);
  app.delete('/api/user/:userId/follows/:followedId', unfollowUser);
  app.delete('/api/user-follow/:userFollowId', unfollowUserById);

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
    userFollowModel.findUserFollowsForFollower(req.params['userId'])
      .sort({'followingSince': -1})
      .limit(req.params['quantity'])
      .then(function(follows) {
        res.send(follows);
      });
  }

  function getFollowers(req, res) {
    userFollowModel.findUserFollowsForFollowed(req.params['userId'])
      .sort({'followingSince': -1})
      .limit(req.params['quantity'])
      .then(function(follows) {
        res.send(follows);
      });
  }

  function isFollowing(req, res) {
    userFollowModel.doesUserFollowOther(
      req.params['userId'],
      req.params['followingId'])
      .then(function(potentialFollow) {
        if (potentialFollow !== null) {
          res.json({'response': true});
        } else {
          res.json({'response': false});
        }
      });
  }

  function unfollowUser(req, res) {
    userFollowModel.deleteUserFollowByFollowerAndFollowed(
      req.params['userId'],
      req.params['followedId'])
      .then(function(response) {
        res.send(response)
      });
  }

  function unfollowUserById(req, res) {
    userFollowModel.deleteUserFollowById(req.params['userFollowId'])
      .then(function(response) {
        res.send(response)
      });
  }

}




