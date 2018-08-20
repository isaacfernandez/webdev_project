
module.exports = function(app) {

  app.post('/api/user/:userId/follows/:followedId', requireLoggedIn, followUser);
  app.get('/api/follow/:followId', getFollow);
  app.get('/api/user/:userId/follows/:quantity', getFollows);
  app.get('/api/user/:userId/follower/:quantity', getFollowers);
  app.get('/api/user/:userId/isFollowing/:followingId', isFollowing);
  app.delete('/api/user/:userId/follows/:followedId', requireLoggedIn, unfollowUser);
  app.delete('/api/user-follow/:userFollowId', requireLoggedIn, unfollowUserById);

  var userFollowModel = require('../models/user-follow/user-follow.model.server');
  var userModel = require('../models/user/user.model.server');
  // schema: follower, followed, followingSince


  function getFollow(req, res) {
    userFollowModel.findUserFollowById(req.params['userId'])
      .then(function(follow) {
        res.send(follow);
      });
  }

  function followUser(req, res) {
    newFollow = {
      follower: req.params['userId'],
      followed: req.params['followedId']
    };
    userFollowModel.createUserFollow(newFollow)
      .then(function(follow) {
        // now update both of the users with this follow
        return userModel.addUserFollow(req.params['userId'], follow._id)
          .then(function() {
            return userModel.addUserFollower(req.params['followedId'], follow._id);
          }).then(function() {
            return follow;
          });
      }).then(function(follow) {
        res.send(follow);
      });
  }

  function getFollows(req, res) {
    userFollowModel.findUserFollowsForFollower(req.params['userId'])
      .sort({'followingSince': -1})
      .limit(parseInt(req.params['quantity']))
      .then(function(follows) {
        res.send(follows);
      });
  }

  function getFollowers(req, res) {
    userFollowModel.findUserFollowsForFollowed(req.params['userId'])
      .sort({'followingSince': -1})
      .limit(parseInt(req.params['quantity']))
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
          res.send({'response': true});
        } else {
          res.send({'response': false});
        }
      });
  }

  function unfollowUser(req, res) {
    userFollowModel.findUserFollowByFollowerAndFollowed(
      req.params['usedId'],
      req.params['followedId'])
      .then(function(follow) {
        return userFollowModel.deleteUserFollowByFollowerAndFollowed(
          req.params['userId'],
          req.params['followedId'])
          .then(function(response) {
            // now update both of the users with this follow
            return userModel.removeUserFollow(follow.follower, follow._id)
              .then(function() {
                return userModel.removeUserFollowed(follow.followed, follow._id);
              });
          });
      }).then(function(response) {
        res.send(response);
      });
  }

  function unfollowUserById(req, res) {
    userFollowModel.findUserFollowById(req.params['userFollowId'])
      .then(function(userFollow) {
        return userFollowModel.deleteUserFollowById(req.params['userFollowId'])
          .then(function(response) {
            return userModel.removeUserFollow(userFollow.follower, userFollow._id)
              .then(function() {
                return userModel.removeUserFollower(userFollow.followed, userFollow._id);
              });
          });
      }).then(function(response) {
        res.send(response);
      });
  }

}


