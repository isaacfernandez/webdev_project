# Web Dev Summer 2 Project
This repository is a project requirement for web dev.

# Requirements for 8/5/2018

Project Prototype: This can be a basic listing and detailing (No fancy User interface) of existing data fetched from the external API. Idea of having this as a project assignment is to make you start with your actual implementation of Web Dev project. You will need to decide many things such as selecting the technologies you are comfortable with, working with the correct API/s that is suitable for your application, getting user-keys for the API etc.

# Current APIs:
 * post('/api/feed/:feedId/follows/:userId', userFollowFeed)
 * get('/api/feed/:feedId/follows/:quantity', getFeedFollowers)
 * get('/api/user/:userId/feed-follows/:quantity', getFeedsFollowing)
 * get('/api/feed/:feedId/isFollowing/:followerId', isUserFollowingFeed)
 * delete('/api/feed/:feedId/follows/:userId', deleteFeedFollow)
 * delete('/api/feed-follow/:feedFollowId', deleteFeedFollowById)
 * get('/api/user', findAllUsers)
 * get('/api/user/id/:userId', findUserById)
 * get('/api/user/name/:username', findUserByUsername)
 * get('/api/profile', profile)
 * post('/api/logout', logout)
 * post('/api/login', login)
 * post('/api/register', register)
 * get('/api/login/loggedIn', loggedIn)
 * put('/api/user', updateUser)
 * delete('/api/user/:userId', deleteUser)
 * post('/api/user/:userId/follows/:followedId', followUser)
 * get('/api/user/:userId/follows/:quantity', getFollows)
 * get('/api/user/:userId/follower/:quantity', getFollowers)
 * get('/api/user/:userId/isFollowing/:followingId', isFollowing)
 * delete('/api/user/:userId/follows/:followedId', unfollowUser)
 * delete('/api/user-follow/:userFollowId', unfollowUserById)
 * post('/api/post/:feedId', postToFeed)
 * put('/api/post/:postId', updatePost)
 * delete('/api/post/:postId', deletePost)
 * get('/api/feed/:quantity', getFeeds)
 * post('/api/feed', createFeed)
 * delete('/api/feed/:feedId', deleteFeed)
 * put('/api/feed/:feedId', updateFeed)
 * get('/api/feed/:feedName/external/:quantity', getExternalPosts)
 * get('/api/feed/:feedId/internal/:quantity', getInternalPosts)
 * get('/api/feed/search/:string', searchForFeeds)

