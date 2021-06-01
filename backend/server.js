const express = require('express');
const app = express();
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
const plantRouter = require('./routes/plant')
const userRouter = require('./routes/user')
//const cors = require('cors')
// Mongodb connection using mongoose module
const mongoose = require('mongoose');
require('dotenv').config()
mongoose.connect(process.env.DB_LINK, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(()=> console.log('MongoDB database is Successfully connected'))
.catch(()=> console.log('Database connection failed!'))

app.use(express.static(__dirname+ '/public'));
app.use(express.json())
//app.use(cors({origin: '*'}));

// Passport js settings
const passport = require('passport');
// pass passport npm package into config/passport.js
require('./config/passport')(passport);
// Passport Use settings
app.use(passport.initialize());
app.use(passport.session());

// routes as REST API for frontend
app.post('/signin/passport/local', passport.authenticate('local'), (req, res)=> {
    console.log(req.user)
    res.send(req.user)
});

// Github login process
// ask github to give me some data
app.get('/signin/passport/github', passport.authenticate('github'));
// receive the github callback result
app.get('/auth/github/callback', passport.authenticate('github'), (req, res)=>{
    console.log(req.user)
    res.send(req.user);
})

// Facebook authentication
app.get('/signin/passport/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook'), (req, res)=>{
    console.log(req.user)
    res.send(req.user);
})

app.use('/plant', plantRouter);
app.use('/user', userRouter);

app.listen(5000, ()=>{
    console.log('Backend is running on port 5000')
})


