const express = require("express");
const app = express();
const session = require("express-session");
const plantRouter = require("./routes/plant");
const userRouter = require("./routes/user");
const cors = require("cors");
// Mongodb connection using mongoose module
const mongoose = require("mongoose");
require("dotenv").config();
mongoose
  .connect(process.env.DB_LINK, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB database is Successfully connected"))
  .catch(() => console.log("Database connection failed!"));

app.use(express.static(__dirname + "/public"));
app.use(cors());

//! other kind of cors
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use(express.json());

// Passport js settings
const passport = require("passport");
// pass passport npm package into config/passport.js
require("./config/passport")(passport);
// Passport Use settings
app.use(passport.initialize());
app.use(passport.session());

app.get("/auth/github", passport.authenticate("github"));

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);
// routes as REST API for frontend
app.post(
  "/signin/passport/local",
  passport.authenticate("local", {
    failureRedirect: "/failure", // logout page
  }),
  (req, res) => {
    res.send("User successfully login");
  }
);

app.get("/failure", (req, res) => {
  res.send("Log in failed!");
});
app.get("/successProfile", (req, res) => {
  res.send("Successfully login");
});

app.use("/plant", plantRouter);
app.use("/user", userRouter);

// app.post('/user/data', (req, res)=> {
//     // some data from frontend react UI
//     console.log(req.body)
//     // Save data to database
//     // change or use data and send back message to fronend
//     res.json({
//         msg: 'successfully received!',
//         username: req.body.username,
//         age: 32,
//         country: 'germany'
//     })
// })
// app.all("/*", function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });
app.listen(5000, () => {
  console.log("Backend is running on port 5000");
});
