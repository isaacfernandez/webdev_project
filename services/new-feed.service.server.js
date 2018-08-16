
var reqs = require('request-promise');
var request = require('request');

var apiKey = process.env.NEWS_API_KEY;

var newsApi = 'https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=7dd275983bdb4bbea426b022d69d76f3';

module.exports = app => {

  app.get('/api/news', getAllWhatAmIDoingNews);

  function getAllWhatAmIDoingNews(req, res) {
    var response = 'Hello Express app!\n';
    req.pipe(request(newsApi)).pipe(res);
  }

//    reqs(newsApi).then(function(response) {
//      console.log(response);
//      return response.articles;
//    })
//    .then(function(news) {
//      console.log(news);
//      res.json(news);//res.send(news);
//      console.log('bogus');
//    });
//  }

};
