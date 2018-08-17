var mongoose = require('mongoose');
var schema = require('./user.schema.server');
var model = mongoose.model('UserModel', schema);


function findUserByCredentials(creds) {
  return model.findOne(creds);
}

function findUserByUsername(username) {
  return model.findOne({username: username});
}

function findUserById(idToFind) {
  return model.findById(idToFind);
}

function createUser(newUser) {
  return model.create(newUser);
}

function findAllUsers() {
  return model.find();
}

function deleteUserById(idToDelete) {
  return model.remove({_id: idToDelete});
}

function updateUser(user, idToUpdate) {
  return model.update({_id: idToUpdate}, {$set: user});
}

module.exports = {
  findUserByCredentials: findUserByCredentials,
  findUserByUsername: findUserByUsername,
  findUserById: findUserById,
  createUser: createUser,
  findAllUsers: findAllUsers,
  deleteUserById: deleteUserById,
  updateUser: updateUser
};
