# Web Dev Summer 2 Project
This repository is a project requirement for web dev.

# Requirements for 8/5/2018

Project Prototype: This can be a basic listing and detailing (No fancy User interface) of existing data fetched from the external API. Idea of having this as a project assignment is to make you start with your actual implementation of Web Dev project. You will need to decide many things such as selecting the technologies you are comfortable with, working with the correct API/s that is suitable for your application, getting user-keys for the API etc.

# Current APIs:

app.post('/api/feed/:feedId/follows/:userId', userFollowFeed);
  app.get('/api/feed/:feedId/follows/:quantity', getFeedFollowers);
  app.get('/api/user/:userId/feed-follows/:quantity', getFeedsFollowing);
  app.get('/api/feed/:feedId/isFollowing/:followerId', isUserFollowingFeed);
  app.delete('/api/feed/:feedId/follows/:userId', deleteFeedFollow);
  app.delete('/api/feed/:feedFollowId', deleteFeedFollowById);
  app.get('/api/feed/:quantity', getFeeds);
  app.post('/api/feed', createFeed);
  app.delete('/api/feed/:feedId', deleteFeed);
  app.put('/api/feed/:feedId', updateFeed);
  app.get('/api/feed/:feedId/external/:quantity', getExternalPosts);
  app.get('/api/feed/:feedId/internal/:quantity', getInternalPosts);
  app.get('/api/feed/search/:string', searchForFeeds);
  app.get('/api/news', getAllWhatAmIDoingNews);
  app.post('/api/post/:feedId', postToFeed);
  app.put('/api/post/:postId', updatePost);
  app.delete('/api/post/:postId', deletePost);
  app.post('/api/user/:userId/follows/:followedId', followUser);
  app.get('/api/user/:userId/follows/:quantity', getFollows);
  app.get('/api/user/:userId/follower/:quantity', getFollowers);
  app.get('/api/user/:userId/isFollowing/:followingId', isFollowing);
  app.delete('/api/user/:userId/follows/:followedId', unfollowUser);
  app.get('/api/user', findAllUsers);
  app.get('/api/user/id/:userId', findUserById);
  app.get('/api/user/name/:username', findUserByUsername);
  app.get('/api/profile', profile);
  app.post('/api/logout', logout);
  app.post('/api/login', login);
  app.post('/api/register', register);
  app.get('/api/login/loggedIn', loggedIn);
  app.put('/api/user', updateUser); // just add more endpoints meh
  app.delete('/api/user/:userId', deleteUser);




