
module.exports = function (app) {
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
          res.sendStatus(404);
        }
      })
  }

  function logout(req, res) {
    req.session.destroy();
    res.send(200);
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
      res.send(403);
    } else {
      userModel.findUserById(req.session['currentUser']._id)
        .then(function(response) {
          res.send(response);
        });
    }
  }

  function register(req, res) {
    var keep_going;
    console.log(req.body);
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
          res.sendStatus(404);
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
          res.sendStatus(404);
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
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }
  }

  function logout(req, res) {
    req.session.destroy();
    res.sendStatus(200);
  }
}
