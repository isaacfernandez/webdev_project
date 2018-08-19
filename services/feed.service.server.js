



module.exports = function(app) {
  app.get('/api/feed/:quantity', getFeeds);
  app.post('/api/feed', createFeed);
  app.delete('/api/feed/:feedId', deleteFeed);
  app.put('/api/feed/:feedId', updateFeed);
  app.get('/api/feed/:feedName/external/:quantity', getExternalPosts);
  app.get('/api/feed/:feedId/internal/:quantity', getInternalPosts);
  app.get('/api/feed/search/:string', searchForFeeds);

  var fetch = require('node-fetch');
  var postModel = require('../models/post/post.model.server');
  var feedModel = require('../models/feed/feed.model.server');

  var apiKey = 'apiKey=' + process.env.NEWS_API_KEY;
  var baseURL = 'https://newsapi.org/v2/top-headlines?country=us&';
  var queryURL = baseURL + apiKey + '&category='
  var externalFeeds = [
    'business', 'entertainment', 'health', 'science', 'sports', 'technology'
  ];
  

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
    if (externalFeeds.indexOf(req.params['feedName']) > -1) {
      // It seems reasonable to not give the absolutely most up to date posts
      // and waiting for the promises to resolve is not an acceptable user
      // experience, hence returning whatever the currently most up to date are.
      feedModel.getExternalPosts(req.params['feedName'], req.params['quantity'])
        .then(function(posts) {
          console.log('here');
          posts = posts[0]['externalPosts'].slice(0, req.params['quantity']);
          res.send(posts);
        });
      feedModel.findFeedByName(req.params['feedName'])
        .then((feedObj) => {
          console.log('in thing');
          fetch(queryURL + req.params['feedName'])
            .then((response) => response.json())
            .then(function(arts) {
              articles = arts.articles;
              articles.forEach(function(article) {
                postModel.findPostsByTitle(article['title'])
                  .then((response) => {
                    if (typeof response == 'undefined' || response.length === 0) {
                      postModel.createPost({
                        postTitle: article['title'],
                        postLink: article['url'],
                        feed: feedObj._id
                      }).then(function(response) {
                        console.log('what is the response');
                        console.log(response);
                        feedModel.addExternalPost(response.feed, response._id);
                      });
                    } else {
                      console.log('post already exists');
                    }
                  });
                });
            });
        });
    } else {
      res.send({'error': 'not an existing external feed'});
    }
  }

  function getInternalPosts(req, res) {
    feedModel.getInternalPosts(req.params['feedId'], req.params['quantity'])
      .then(function(posts) {
        posts = posts[0]['internalPosts'].slice(0, req.params['quantity']);
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
