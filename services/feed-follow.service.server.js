 
module.exports = function(app) {

  app.post('/api/feed/:feedId/follows/:userId', requireLoggedIn, userFollowFeed);
  app.get('/api/feed/:feedId/follows/:quantity', getFeedFollowers);
  app.get('/api/user/:userId/feed-follows/:quantity', getFeedsFollowing);
  app.get('/api/feed/:feedId/isFollowing/:followerId', isUserFollowingFeed);
  app.delete('/api/feed/:feedId/follows/:userId', requireLoggedIn, deleteFeedFollow);
  app.delete('/api/feed-follow/:feedFollowId', requireLoggedIn, deleteFeedFollowById);

  var feedFollowModel = require('../models/feed-follow/feed-follow.model.server');
  var userModel = require('../models/user/user.model.server');
  var postModel = require('../models/post/post.model.server');

  function userFollowFeed(req, res) {
    var newFollow = {
      'feed': req.params['feedId'],
      'follower': req.params['userId']
    }
    feedFollowModel.createFeedFollow(newFollow)
      .then(function(feedFollow) {
        return userModel.addFeedFollow(req.params['userId'], feedFollow._id);
      }).then(function(response) {
        res.send(response);
      });
  }

  function getFeedFollowers(req, res) {
    feedFollowModel.findFeedFollowsForFeed(req.params['feedId'])
      .sort({'followingSince': -1})
      .limit(parseInt(req.params['quantity']))
      .then(function(followers) {
        res.send(followers);
      });
  }

  function getFeedsFollowing(req, res) {
    feedFollowModel.findFeedFollowsOfFollower(req.params['userId'])
      .sort({'followingSince': -1})
      .limit(parseInt(req.params['quantity']))
      .then(function(feeds) {
        res.send(feeds);
      });
  }

  function isUserFollowingFeed(req, res) {
    feedFollowModel.findFeedFollowByFeedAndFollower(
      req.params['feedId'],
      req.params['followerId'])
      .then(function(potentialFollow) {
        if (potentialFollow !== null) {
          res.json(potentialFollow);
        } else {
          res.json({'error': 'not following feed'});
        }
      });
  }

  function deleteFeedFollow(req, res) {
    feedFollowModel.findFeedFollowByFeedAndFollow(
      req.params['feedId'],
      req.params['followerId'])
      .then(function(feedFollow) {
        return userModel.removeFeedFollowById(feedFollow.follower, feedFollow._id)
          .then(function() {
            return feedFollowModel.deleteFeedFollowByFeedAndFollower(
              req.params['feedId'],
              req.params['followerId']);
          });
      }).then(function(response) {
        res.send(response);
      });
  }

  function deleteFeedFollowById(req, res) {
    feedFollowModel.findFeedFollowById(req.params['feedFollowId'])
      .then(function(feedFollow) {
        return userModel.removeFeedFollowById(
          feedFollow.follower,
          req.params['feedFollowId'])
          .then(function(feedFollow) {
            return feedFollowModel.deleteFeedFollowById(req.params['feedFollowId'])
          });
      }).then(function(response) {
        res.send(response);
      });
  }
}
