const express = require('express');
const app = express();
const cors = require('cors')
const plantRouter = require('./routes/plant')
const userRouter = require('./routes/user')
const mongoose = require('mongoose');
const passport = require('passport');
require('dotenv').config();
// pass passport npm package into config/passport.js
require('./config/passport')(passport);
app.use(cors());
// Mongodb connection using mongoose module
mongoose.connect(process.env.DB_LINK, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(()=> console.log('MongoDB database is Successfully connected'))
.catch(()=> console.log('Database connection failed!'))

// Passport js settings
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname+ '/public'));
app.use(express.json())

app.post('/signin/passport/local', passport.authenticate('local'), (req, res)=> {
    console.log(req.user)
    res.send(req.user)
});

// Github login process
// ask github to give me some data
app.get('/signin/passport/github', passport.authenticate('github'));
// receive the github callback result
app.get('/auth/github/callback', passport.authenticate('github', {
    failureRedirect: 'http://localhost:3000'
}),(req, res)=>{
    console.log(req.user) // user from passport done() callback
    res.redirect('http://localhost:3000/profile/'+req.user._id)
})

// Facebook authentication
app.get('/signin/passport/facebook', passport.authenticate('facebook'));
app.get('/signin/passport/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: 'http://localhost:3000'
}),(req, res)=>{
    res.redirect('http://localhost:3000/profile/'+req.user._id)
})

// passport logout session, remove req.user
app.get('/passport/logout', function(req, res){
    req.logout();
    res.redirect('http://localhost:3000/signinformPassport');
});

app.use('/plant', plantRouter);
app.use('/user', userRouter);

app.listen(5000, ()=>{
    console.log('Backend is running on port 5000')
})


