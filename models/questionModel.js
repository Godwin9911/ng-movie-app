const mongoose = require('mongoose');

const questionModel = new mongoose.Schema({
  question: { type: String },
  answers: { type: Object }
});

module.exports = mongoose.model('Question', questionModel);
