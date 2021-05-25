const User = require("../models/User");

const express = require("express");
const router = express.Router();

router.post("/signup", (req, res) => {
  const newUser = new User(req.body.user);
  newUser.save((err, doc) => {
    res.json(doc);
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.user.email }, (err, user) => {
    if (!user) {
      return res.json("you need to signup");
    }
    req.session.user = user;

    res.json(user);
  });
});

module.exports = router;
