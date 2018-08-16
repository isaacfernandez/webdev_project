



module.exports = function(app) {
  app.get('/api/feed/:quantity', getFeeds);
  app.post('/api/feed', createFeed);
  app.delete('/api/feed/:feedId', deleteFeed);
  app.put('/api/feed/:feedId', updateFeed);
  app.get('/api/feed/:feedId/external/:quantity', getExternalPosts);
  app.get('/api/feed/:feedId/internal/:quantity', getInternalPosts);
  app.get('/api/feed/search/:string', searchForFeeds);

  function getFeeds(req, res) {}
  function createFeed(req, res) {}
  function deleteFeed(req, res) {}
  function updateFeed(req, res) {}
  function getExternalPosts(req, res) {}
  function getInternalPosts(req, res) {]
  function searchForFeeds(req, res) {}

}
