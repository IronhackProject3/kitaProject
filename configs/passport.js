const User = require('../models/User.js');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const passport = require('passport');

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).populate('parent').populate('kita')
    .then(dbUser => {
      done(null, dbUser);
    })
    .catch(error => {
      done(error);
    })
});

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }).populate('parent').populate('kita')
      .then(found => {
        if (found === null) {
          done(null, false, { message: 'Wrong Credentials' })
        } else if (!bcrypt.compareSync(password, found.password)) {
          done(null, false, { message: 'Wrong Credentials' })
        } else {
          done(null, found);
        }
      })
      .catch(error => {
        done(error, false);
      })
  })
)