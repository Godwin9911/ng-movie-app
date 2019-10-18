const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User Model
const User = require('../models/userModel');

module.exports = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      User.findOne({ email }).then((user) => {
        if (!user) return done(null, false, { message: 'That email is not registered' });
        // Match password
        return bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) return done(null, user);
          return done(null, false, { message: 'Incorrrect password' });
        });
      });
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
