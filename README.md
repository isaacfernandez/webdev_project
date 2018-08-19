# Web Dev Summer 2 Project
This repository is a project requirement for web dev.

# Requirements for 8/5/2018

Project Prototype: This can be a basic listing and detailing (No fancy User interface) of existing data fetched from the external API. Idea of having this as a project assignment is to make you start with your actual implementation of Web Dev project. You will need to decide many things such as selecting the technologies you are comfortable with, working with the correct API/s that is suitable for your application, getting user-keys for the API etc.

# Current APIs:

 * post('/api/feed/:feedId/follows/:userId', requireLoggedIn, userFollowFeed)
 * get('/api/feed/:feedId/follows/:quantity', getFeedFollowers)
 * get('/api/user/:userId/feed-follows/:quantity', getFeedsFollowing)
 * get('/api/feed/:feedId/isFollowing/:followerId', isUserFollowingFeed)
 * delete('/api/feed/:feedId/follows/:userId', requireLoggedIn, deleteFeedFollow)
 * delete('/api/feed-follow/:feedFollowId', requireLoggedIn, deleteFeedFollowById)
 * get('/api/user', findAllUsers)
 * get('/api/user/id/:userId', findUserById)
 * get('/api/user/search/:string', searchForUsers)
 * get('/api/user/name/:username', findUserByUsername)
 * get('/api/profile', profile)
 * post('/api/logout', requireLoggedIn, logout)
 * post('/api/login', requireLoggedOut, login)
 * post('/api/register', requireLoggedOut, register)
 * get('/api/login/loggedIn', loggedIn)
 * put('/api/user', requireLoggedIn, updateUser)
 * delete('/api/user/:userId', requireAdmin, deleteUser)
 * post('/api/user/:userId/follows/:followedId', requireLoggedIn, followUser)
 * get('/api/user/:userId/follows/:quantity', getFollows)
 * get('/api/user/:userId/follower/:quantity', getFollowers)
 * get('/api/user/:userId/isFollowing/:followingId', isFollowing)
 * delete('/api/user/:userId/follows/:followedId', requireLoggedIn, unfollowUser)
 * delete('/api/user-follow/:userFollowId', requireLoggedIn, unfollowUserById)
 * post('/api/post/:feedId', requireLoggedIn, postToFeed)
 * put('/api/post/:postId', requireModerator, updatePost)
 * delete('/api/post/:postId', requireModerator, deletePost)
 * get('/api/feeds/:quantity', getFeeds)
 * get('/api/feed/:feedId', getFeed)
 * post('/api/feed', requireModerator, createFeed)
 * delete('/api/feed/:feedId', requireModerator, deleteFeed)
 * put('/api/feed/:feedId', requireModerator, updateFeed)
 * get('/api/feed/:feedName/external/:quantity', getExternalPosts)
 * get('/api/feed/:feedName/internal/:quantity', getInternalPosts)
 * get('/api/feed/search/:string', searchForFeeds)

