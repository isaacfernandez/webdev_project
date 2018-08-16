



module.exports = function(app) {

  app.post('/api/feed/:feedId/follows/:userId', userFollowFeed);
  app.get('/api/feed/:feedId/follows/:quantity', getFeedFollowers);
  app.get('/api/user/:userId/feed-follows/:quantity', getFeedsFollowing);
  app.get('/api/feed/:feedId/isFollowing/:followerId', isUserFollowingFeed);
  app.delete('/api/feed/:feedId/follows/:userId', deleteFeedFollow);

  function userFollowFeed(req, res) {}
  function getFeedFollowers(req, res) {}
  function getFeedsFollowing(req, res) {}
  function isUserFollowingFeed(req, res) {}
  function deleteFeedFollow(req, res) {}

}
