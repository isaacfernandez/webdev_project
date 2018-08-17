



module.exports = function(app) {
  app.get('/api/feed/:quantity', getFeeds);
  app.post('/api/feed', createFeed);
  app.delete('/api/feed/:feedId', deleteFeed);
  app.put('/api/feed/:feedId', updateFeed);
  app.get('/api/feed/:feedId/external/:quantity', getExternalPosts);
  app.get('/api/feed/:feedId/internal/:quantity', getInternalPosts);
  app.get('/api/feed/search/:string', searchForFeeds);

  var feedModel = require('../models/user/feed.model.server');


  function getFeeds(req, res) {
    feedModel.findAllFeeds()
      .then(function (feeds) {
        res.send(feeds);
      })
  }

  function createFeed(req, res) {
    var keep_going;
    feedModel.findFeedByName(req.body.feedName)
      .then(function(response) {
        keep_going = response === null;
      }).then(function() {
        if (keep_going) {
          feedModel.createFeed(req.body)
            .then(function(feed) {
              res.send(feed);
            });
        } else {
          res.sendStatus(404);
        }
      });
  }

  function deleteFeed(req, res) {
    feedModel.deleteFeedById(req.params['feedId'])
      .then(function(response) {
        res.send(response);
      });
  }

  function updateFeed(req, res) {
    var feed = req.body;
    feedModel.updateFeed(req.params['feedId'], feed)
      .then(function(response) {
        if (response.success === 1) {
          res.json(feed);
        } else {
          res.sendStatus(404);
        }
      });
  }

  function getExternalPosts(req, res) {
    feedModel.getExternalPosts(req.params['feedId'], req.params['quantity'])
      .then(function(posts) {
        res.send(posts);
      });
  }

  function getInternalPosts(req, res) {
    feedModel.getInternalPosts(req.params['feedId'], req.params['quantity'])
      .then(function(posts) {
        res.send(posts);
      });
  }

  function searchForFeeds(req, res) {
    feedModel.find({'feedName':
      {'$regex': req.params['string'], '$options': 'i'}})
      .then(function(feeds) {
        res.send(feeds);
      });
  }

}
