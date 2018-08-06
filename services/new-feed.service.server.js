
var reqs = require('request-promise');

var newsApi = 'https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=7dd275983bdb4bbea426b022d69d76f3';

module.exports = app => {

  app.get('/api/news', getAllWhatAmIDoingNews);

  function getAllWhatAmIDoingNews(req, res) {
    var response = 'Hello Express app!\n';
    reqs(newsApi).then(function(response) {
      console.log(response);
      return response.articles;
    })
    .then(function(news) {
      console.log(news);
      res.json(news);//res.send(news);
      console.log('bogus');
    });
  }

};
