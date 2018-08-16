
module.exports = function(app) {

  app.post('/api/post/:feedId', postToFeed);
  app.put('/api/post/:postId', updatePost);
  app.delete('/api/post/:postId', deletePost);

  function postToFeed(req, res) {}
  function updatePost(req, res) {}
  function deletePost(req, res) {}

}
