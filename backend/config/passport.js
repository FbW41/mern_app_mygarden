const User = require("../models/User");
const passport = require("passport");
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

/**
 * Local Strategy: user can login using email and password
 * npm package: passport passport-local
 */
const LocalStrategy = require("passport-local").Strategy;
/**
 * Third-party Authentication:(e.g facebook, github, twitter, google)
 */
//const GithubStrategy = require('passport-github').Strategy;
var GitHubStrategy = require("passport-github").Strategy;
module.exports = function (passport) {
  // serialize and deserialize the user data settings
  //   passport.serializeUser(function (user, done) {
  //     done(null, user.id);
  //   });

  //   passport.deserializeUser(function (id, done) {
  //     User.findById(id, function (err, user) {
  //       done(err, user);
  //     });
  //   });
  // local check of authentication process
  // done: is a callback method for returning the result
  passport.use(
    new LocalStrategy({ usernameField: "email" }, function (
      email,
      password,
      done
    ) {
      User.findOne({ email: email }, (err, user) => {
        if (!user) {
          // if no user
          return done(null, false);
        }
        if (password != user.password) {
          // user password doesnot match
          return done(null, false);
        }
        // u have user and correct password, then return a user
        return done(null, user);
      });
    })
  );

  passport.use(
    new GitHubStrategy(
      {
        clientID: "a71abed68f0fc6c0be35",
        clientSecret: "33d5176e1f431afe2babeb318f07db9562d10593",
        callbackURL: "http://localhost:5000/auth/github/callback",
      },
      function (accessToken, refreshToken, profile, cb) {
        console.log(profile);
        User.findOrCreate({ githubId: profile.id }, function (err, user) {
          return cb(err, user);
        });
      }
    )
  );
};
