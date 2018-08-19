
module.exports = function (app) {
  app.get('/api/user', findAllUsers);
  app.get('/api/user/id/:userId', findUserById);
  app.get('/api/user/search/:string', searchForUsers);
  app.get('/api/user/name/:username', findUserByUsername);
  app.get('/api/profile', profile);
  app.post('/api/logout', requireLoggedIn, logout);
  app.post('/api/login', requireLoggedOut, login);
  app.post('/api/register', requireLoggedOut, register);
  app.get('/api/login/loggedIn', loggedIn);
  app.put('/api/user', requireLoggedIn, updateUser); // just add more endpoints meh
  app.delete('/api/user/:userId', requireAdmin, deleteUser);

  var userModel = require('../models/user/user.model.server');

  function login(req, res) {
    var credentials = req.body;
    userModel
      .findUserByCredentials(credentials)
      .then(function(user) {
        if (user !== null) {
          req.session['currentUser'] = user;
          res.json(user);
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
        res.json(user);
      })
  }

  function findUserByUsername(req, res) {
    var username = req.params['username'];
    userModel.findUserByUsername(username)
      .then(function (user) {
        res.json(user);
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
    userModel.updateUser(user, req.session['currentUser']._id)
      .then(function (response) {
        if (response.success === 1) {
          res.json(user);
        } else {
          res.send({'error': 'failed to update user'});
        }
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
      res.send({'success': 'is logged in'});
    }
  }

  function searchForUsers(req, res) {
    userModel.find({'username':
      {'$regex': req.params['string'], '$options': 'i'}})
      .then(function(users) {
        res.send(users);
      });
  }
}







