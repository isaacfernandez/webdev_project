



module.exports = function(app) {
  app.get('/api/feed/:quantity', getFeeds);
  app.post('/api/feed', createFeed);
  app.delete('/api/feed/:feedId', deleteFeed);
  app.put('/api/feed/:feedId', updateFeed);
  app.get('/api/feed/:feedName/external/:quantity', getExternalPosts);
  app.get('/api/feed/:feedId/internal/:quantity', getInternalPosts);
  app.get('/api/feed/search/:string', searchForFeeds);

  var feedModel = require('../models/feed/feed.model.server');
  var postModel = require('../models/post/post.model.server');

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
      // if this particular feedName doesn't exist yet, create it
      feedModel.findFeedByName(req.params['feedName'])
        .then((response) => response.json())
        .then(function(potentialArticle) {
          if (potentialArticle === null) {
            feedModel.createFeed({'feedName': req.params['feedName']})
          }
        }).then(() => {
          // one of the existing external feeds
          feedModel.findFeedByName(req.params['feedName']).then((feedObj) => {
            fetch(queryURL + req.params['feedName'])
              .then((response) => response.json())
              .then(function(articles) {
                for (var art = 0; art < articles.length; articles++) {
                  // determine if title already exists, if not then add
                  postModel.findPostByTitle(art.title)
                    .then(function(maybeFound) {
                      console.log('in getExternalPosts');
                      console.log(maybeFound);
                      if (maybeFound === undefined) {
                        postModel.createPost({
                          postTitle: art.title,
                          postLink: art.url,
                          feed: feedObj._id
                        }).then(function(response) {
                          return response.json();
                        }).then(function(recentPost) {
                          feedModel.addExternalPost(feedObj._id, recentPost._id);
                        });
                      }
                    });
                }
              });
          });
        });
    }

    feedModel.getExternalPosts(req.params['feedName'], req.params['quantity'])
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
