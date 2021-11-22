const express = require("express");
const app = express();
const cors = require("cors");
const plantRouter = require("./routes/plant");
const userRouter = require("./routes/user");
const mongoose = require("mongoose");
const passport = require("passport");
require("dotenv").config();
// pass passport npm package into config/passport.js
require("./config/passport")(passport);
app.use(cors());
// Mongodb connection using mongoose module
mongoose
  .connect(process.env.DB_LINK, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB database is Successfully connected"))
  .catch(() => console.log("Database connection failed!"));

// Passport js settings
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + "/public"));
app.use(express.json());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.post(
  "/signin/passport/local",
  passport.authenticate("local"),
  (req, res) => {
    console.log("from local post", req.user);
    res.send(req.user);
  }
);

// Github login process
// ask github to give me some data
app.get("/signin/passport/github", passport.authenticate("github"));
// receive the github callback result
app.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "http://localhost:3000",
  }),
  (req, res) => {
    console.log(req.user); // user from passport done() callback
    res.redirect("http://localhost:3000/profile/" + req.user._id);
  }
);

// Facebook authentication
app.get("/signin/passport/facebook", passport.authenticate("facebook"));
app.get(
  "/signin/passport/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "http://localhost:3000",
  }),
  (req, res) => {
    res.redirect("http://localhost:3000/profile/" + req.user._id);
  }
);

// passport logout session, remove req.user
app.get("/passport/logout", function (req, res) {
  req.logout();
  res.redirect("http://localhost:3000/signinformPassport");
});

const multer = require("multer");
// settings for multer
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "public/images");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({storage});
const sgMail = require("@sendgrid/mail");
// require("dotenv").config();

app.post("/contact", upload.single("image"), (req, res) => {
  //! this req.user didn't work , need congig with passport register
  console.log("current", req.user);
  console.log("doc", req.body);
  const {name, message, email} = req.body;
  sgMail.setApiKey(process.env.SENDGRIDAPI);
  const msg = {
    to: "alaani.hiba@gmail.com",
    from: "hiba.al-aani@digitalcareerinstitute.org",
    // html: `<h1>hello there</h1>
    // <h4> from ${req.body.email}</h4>
    // <h3>${req.body.message}</h3>
    // `,

    templateId: process.env.SENDGRID_TEMPLATE_ID,
    dynamicTemplateData: {
      name,
      message,
      email,
      subject: "test you in our web app",
    },
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("your email is successfully sent");
    })
    .catch((error) => console.log(error));

  res.json("you send the email successfully");
});

app.get("/failure", (req, res) => {
  res.send("Log in failed!");
});
app.get("/successProfile", (req, res) => {
  res.send("Successfully login");
});

app.use("/plant", plantRouter);
app.use("/user", userRouter);

// app.all("/*", function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });
app.listen(5001, () => {
  console.log("Backend is running on port 5001");
});
