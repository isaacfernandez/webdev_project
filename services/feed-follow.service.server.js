
module.exports = function(app) {

  app.post('/api/feed/:feedId/follows/:userId', userFollowFeed);
  app.get('/api/feed/:feedId/follows/:quantity', getFeedFollowers);
  app.get('/api/user/:userId/feed-follows/:quantity', getFeedsFollowing);
  app.get('/api/feed/:feedId/isFollowing/:followerId', isUserFollowingFeed);
  app.delete('/api/feed/:feedId/follows/:userId', deleteFeedFollow);
  app.delete('/api/feed-follow/:feedFollowId', deleteFeedFollowById);

  var feedFollowModel = require('../models/feed-follow/feed-follow.model.server');
  var userModel = require('../models/user/user.model.server');

  function userFollowFeed(req, res) {
    var newFollow = {
      'feed': req.params['feedId'],
      'follower': req.params['userId']
    }
    feedFollowModel.createFeedFollow(newFollow)
      .then(function(feedFollow) {
        userModel.addFeedFollow(req.params['userId'], feedFollow._id);
        res.send(feedFollow);
      });
  }

  function getFeedFollowers(req, res) {
    feedFollowModel.findFeedFollowsForFeed(req.params['feedId'])
      .sort({'followingSince': -1})
      .limit(req.params['quantity'])
      .then(function(followers) {
        res.send(followers);
      });
  }

  function getFeedsFollowing(req, res) {
    feedFollowModel.findFeedFollowsOfFollower(req.params['userId'])
      .sort({'followingSince': -1})
      .limit(req.params['quantity'])
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
          res.json({'response': true});
        } else {
          res.json({'response': false});
        }
      });
  }

  function deleteFeedFollow(req, res) {
    feedFollowModel.findFeedFollowByFeedAndFollow(
      req.params['feedId'],
      req.params['followerId'])
      .then(function(feedFollow) {
        userModel.removeFeedFollowById(feedFollow.follower, feedFollow._id)
      });
    feedFollowModel.deleteFeedFollowByFeedAndFollower(
      req.params['feedId'],
      req.params['followerId'])
      .then(function(response) {
        res.send(response);
      });
  }

  function deleteFeedFollowById(req, res) {
    feedFollowModel.findFeedFollowById(req.params['feedFollowId'])
      .then(function(feedFollow) {
        userModel.removeFeedFollowById(
          feedFollow.follower,
          req.params['feedFollowId'])
      });
    feedFollowModel.deleteFeedFollowById(req.params['feedFollowId'])
      .then(function(response) {
        res.send(response);
      });
  }
}
