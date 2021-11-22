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
const GitHubStrategy = require("passport-github").Strategy;
// const FacebookStrategy = require("passport-facebook").Strategy;

module.exports = function (passport) {
  // serialize and deserialize the user data settings
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

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
  // local check of authentication process
  // done: is a callback method for returning the result
  passport.use(
    new LocalStrategy({ usernameField: "email" }, function (
      email,
      password,
      done
    ) {
      User.findOne({ email: email }, (err, user) => {
        if (err) throw err;
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

  // GITHUB Strategy code:
  passport.use(
    new GitHubStrategy(
      {
        clientID: "a71abed68f0fc6c0be35",
        clientSecret: "33d5176e1f431afe2babeb318f07db9562d10593",
        callbackURL: "/auth/github/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        /**
         *  find the github user data from database
         *  if no user data for github user than create one
         */
        User.findOne({ github_id: profile.id }, (err, user) => {
          if (err) return done(err);
          // if a user and log-in
          if (user) {
            return done(null, user);
          } else {
            // when no user create a account
            let newUser = new User({
              github_id: profile.id,
              username: profile.username,
            });
            newUser.save((err, doc) => {
              return done(null, doc);
            });
          }
        });
      }
    )
  );

  // FACEBOOK STRATEGY code
  // passport.use(
  //   new FacebookStrategy(
  //     {
  //       clientID: "981500309332364",
  //       clientSecret: "d8338e1527f3497a106d70e2ce9a8a77",
  //       callbackURL: "/signin/passport/facebook/callback",
  //     },
  //     function (accessToken, refreshToken, profile, done) {
  //       /**
  //        *  find the facebook user data from database
  //        *  if no user data for facebook user than create one
  //        */
  //       User.findOne({ facebook_id: profile.id }, (err, user) => {
  //         if (err) return done(err);
  //         if (user) {
  //           return done(null, user);
  //         } else {
  //           // when no user create a account
  //           let newUser = new User({
  //             facebook_id: profile.id,
  //             username: profile.displayName,
  //           });
  //           newUser.save((err, doc) => {
  //             console.log(docy);
  //             return done(null, doc);
  //           });
  //         }
  //       });
  //     }
  //   )
  // );
};
