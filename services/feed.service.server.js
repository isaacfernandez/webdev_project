


module.exports = function(app) {
  app.get('/api/feeds/:quantity', getFeeds);
  app.get('/api/feed/:feedId', getFeed);
  app.post('/api/feed', requireModerator, createFeed);
  app.delete('/api/feed/:feedId', requireModerator, deleteFeed);
  app.put('/api/feed/:feedId', requireModerator, updateFeed);
  app.get('/api/feed/:feedName/external/:quantity', getExternalPosts);
  app.get('/api/feed/:feedName/internal/:quantity', getInternalPosts);
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
 
  function getFeed(req, res) {
    feedModel.findFeedById(req.params['feedId'])
      .then(function(feed) {
        res.send(feed);
      });
  }
 

  function getFeeds(req, res) {
    feedModel.findAllFeeds()
      .then(function (feeds) {
        res.send(feeds);
      });
  }

  function createFeed(req, res) {
    var keep_going;
    console.log('in createFeed');
    console.log(req.body);
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
          res.send({'error': 'name already taken'});
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
          res.send(feed);
        } else {
          res.send({'error': 'failed to update'});
        }
      });
  }

  function getExternalPosts(req, res) {
    var quantity = parseInt(req.params['quantity']);
    if (externalFeeds.indexOf(req.params['feedName']) > -1) {
      // It seems reasonable to not give the absolutely most up to date posts
      // and waiting for the promises to resolve is not an acceptable user
      // experience because of the newsapi.org query latency,
      // hence returning whatever the currently most up to date are.
      feedModel.getExternalPosts(req.params['feedName'], quantity)
        .then(function(posts) {
          console.log('here');
          posts = posts[0]['externalPosts'].slice(0, quantity);
          res.send(posts);
        });
      // now update the DB so it mirror what our external API would show
      feedModel.findFeedByName(req.params['feedName'])
        .then((feedObj) => {
          console.log('in thing');
          fetch(queryURL + req.params['feedName'])
            .then((response) => response.json())//res.send(response))
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
    var quantity = parseInt(req.params['quantity']);
    feedModel.getInternalPosts(req.params['feedName'], quantity)
      .then(function(posts) {
        posts = posts[0]['internalPosts'].slice(0, quantity);
        res.send(posts);
      });
  }

  function searchForFeeds(req, res) {
    feedModel.findFeedsByName(req.params['string'])
      .then(function(feeds) {
         res.send(feeds);
      });
  }

}
