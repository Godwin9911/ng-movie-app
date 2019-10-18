const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String },
  password: { type: String },
  favourites: { type: Object }
});

module.exports = mongoose.model('User', userModel);
