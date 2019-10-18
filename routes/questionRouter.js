/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
const express = require('express');
const uuid = require('uuid');

function routes(Question) {
  const questionRouter = express.Router();

  questionRouter.route('/postquestion')
    .post((req, res) => {
      const newQuestion = new Question(req.body);
      newQuestion.save()
        .then((question) => res.status(201).json(question));
    });

  questionRouter.route('/allquestions')
    .get((req, res) => {
      Question.find((err, questions) => {
        if (err) return res.send(err);
        return res.status(200).json(questions);
      }).catch((err) => console.log(err));
    });

  questionRouter.route('/getquestion/:id')
    .get((req, res) => {
      Question.findById(req.params.id, (err, questions) => {
        if (err) return res.send(err);
        return res.status(200).json(questions);
      }).catch((err) => console.log(err));
    });

  questionRouter.route('/postanswer')
    .post((req, res) => {
      const { id, answer, userId } = req.body;
      const insertanswers = {
        answerId: uuid(),
        answer,
        userId,
      };
      Question.updateOne({ _id: id }, { $push: { answers: { ...insertanswers } } })
        .then((data) => res.status(200).json(data))
        .catch((err) => console.log(err));
    });

  questionRouter.route('/deleteanswer/:questionId/:answerId')
    .delete((req, res) => {
      Question.updateOne({ _id: req.params.questionId }, { $pull: { answers: { answerId: req.params.answerId } } })
        .then(() => res.sendStatus(204))
        .catch((err) => console.log(err));
    });

  return questionRouter;
}

module.exports = routes;
