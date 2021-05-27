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

app.use(express.json());
app.use(
  session({
    secret: "secret",
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);
// routes as REST API for frontend
app.use("/plant", plantRouter);
app.use("/user", userRouter);

app.listen(5000, () => {
  console.log("Backend is running on port 5000");
});

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

app.listen(5000, () => {
  console.log("Backend is running on port 5000");
});
