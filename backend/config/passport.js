const User = require('../models/User');
/**
 * Local Strategy: user can login using email and password
 * npm package: passport passport-local
 */
const LocalStrategy = require('passport-local').Strategy;
/**
 * Third-party Authentication:(e.g facebook, github, twitter, google)
 */
//const GithubStrategy = require('passport-github').Strategy;
module.exports = function(passport) {
    // serialize and deserialize the user data settings
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
       
    passport.deserializeUser(function(id, done) {
        User.findById(id, function (err, user) {
          done(err, user);
        });
    });
    // local check of authentication process
    // done: is a callback method for returning the result
    passport.use(new LocalStrategy({usernameField: 'email'},function(email,password, done){
        User.findOne({email: email}, (err, user)=>{
            if(!user) { // if no user
                return done(null, false);
            }
            if(password != user.password) { // user password doesnot match
                return done(null, false);
            }
            // u have user and correct password, then return a user
            return done(null, user); 
        })
    })) 
}