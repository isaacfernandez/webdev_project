
module.exports = function (app) {
  app.get('/api/user', findAllUsers);
  app.get('/api/user/id/:userId', findUserById);
  app.get('/api/user/search/:string', searchForUsers);
  app.get('/api/user/name/:username', findUserByUsername);
  app.get('/api/profile', profile);
  app.post('/api/logout', requireLoggedIn, logout);
  app.post('/api/login', requireLoggedOut, login);
  app.post('/api/register', requireLoggedOut, register);
  app.post('/api/user/createUser', requireAdmin, createUser);
  app.get('/api/login/loggedIn', loggedIn);
  app.put('/api/user/:userId', requireLoggedIn, updateUser); // just add more endpoints meh
  app.delete('/api/user/:userId', requireAdmin, deleteUser);

  var userModel = require('../models/user/user.model.server');

  function login(req, res) {
    var credentials = req.body;
    userModel
      .findUserByCredentials(credentials)
      .then(function(user) {
        if (user !== null) {
          req.session['currentUser'] = user;
          res.send(user);
        } else {
          res.send({'error': 'credentials not found'});
        }
      })
  }

  function logout(req, res) {
    req.session.destroy();
    res.send({'success': 'logged out'});
  }

  function findUserById(req, res) {
    var id = req.params['userId'];
    userModel.findUserById(id)
      .then(function (user) {
        res.send(user);
      })
  }

  function findUserByUsername(req, res) {
    var username = req.params['username'];
    userModel.findUserByUsername(username)
      .then(function (user) {
        res.send(user);
      })
  }

  function profile(req, res) {
    if (req.session['currentUser'] === undefined) {
      res.send({'error': 'not logged in'});
    } else {
      userModel.findUserById(req.session['currentUser']._id)
        .then(function(response) {
          res.send(response);
        });
    }
  }

  function createUser(req, res) {
    var keep_going;
    userModel.findUserByUsername(req.body['username'])
      .then(function(response) {
        keep_going = response === null;
      }).then(function() {
        if (keep_going) {
          userModel.createUser(req.body)
            .then(function(user) {
              res.send(user);
            });
        } else {
          res.send({'error': 'username taken'});
        }
      });
  }

  function register(req, res) {
    var keep_going;
    userModel.findUserByUsername(req.body['username'])
      .then(function(response) {
        keep_going = response === null;
      }).then(function() {
        if (keep_going) {
          userModel.createUser(req.body)
            .then(function(user) {
              req.session['currentUser'] = user;
              res.send(user);
            });
        } else {
          res.send({'error': 'username taken'});
        }
      });
  }

  function updateUser(req, res) {
    var user = req.body;
    userModel.updateUser(user, req.params['userId'])
      .then(function (response) {
        res.send(response);
      });
  }

  function findAllUsers(req, res) {
    userModel.findAllUsers()
      .then(function (users) {
        res.send(users);
      })
  }

  function deleteUser(req, res) {
    userModel.deleteUserById(req.params['userId'])
      .then(function(response) {
        res.send(response);
      })
  }

  function loggedIn(req, res) {
    if (req.session['currentUser'] === undefined) {
      res.send({'error': 'not logged in'});
    } else {
      res.send(req.session['currentUser']);
    }
  }

  function searchForUsers(req, res) {
    userModel.findUsersByUsername(req.params['string'])
      .then(function(users) {
        res.send(users);
      });
  }
}







