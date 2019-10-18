/* eslint-disable no-underscore-dangle */
/* eslint-disable semi */
/* eslint-disable no-console */
const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
// const uuid = require('uuid');

function routes(User) {
  const userRouter = express.Router();

  userRouter.route('/register')
    .post((req, res) => {
      User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
          return res.status(403).json({ message: 'email already exists' });
        }
        const newUser = new User(req.body);
        bcrypt.genSalt(10, (err, salt) => {
          // eslint-disable-next-line no-shadow
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser.save();
            return res.status(201).json(newUser);
          });
        });
      });
    });

  userRouter.route('/login')
    .post(passport.authenticate('local', {
      failureRedirect: 'login',
      failureFlash: true
    }),
    (req, res, next) => {
      res.status(200).json(req.user);
      next();
    })
    .get((req, res) => {
      const message = req.flash('error');
      res.status(401).json({ message });
    });

  userRouter.route('/logout')
    .get((req, res) => {
      req.logout();
      res.status(200).json({ message: 'logout successfull' });
    });

  userRouter.route('/checkidentity')
    .get((req, res) => {
      res.locals.user = req.user || null;
      if (res.locals.user) return res.status(200).json(req.user);
      return res.status(404).json({ message: 'not logged In' });
    });

  userRouter.route('/favourites')
    .post((req, res) => {
      User.updateOne({ _id: req.user._id }, { $push: { favourites: { ...req.body } } })
        .then((data) => res.status(200).json(data))
        .catch((err) => console.log(err));
    })
    .get((req, res) => {
      User.findOne({ email: req.user.email }).then((user) => {
        if (user) {
          const { favourites } = user
          return res.status(200).json({ favourites })
        }
        return res.status(404).json({ message: 'User not found' })
      })
    })

  userRouter.route('/favourites/:movieId')
    .delete((req, res) => {
      // eslint-disable-next-line radix
      const movieId = parseInt(req.params.movieId);
      User.updateOne({ _id: req.user._id }, { $pull: { favourites: { id: movieId } } })
        .then(() => res.sendStatus(204))
        .catch((err) => console.log(err));
    });

  return userRouter;
}

module.exports = routes;
