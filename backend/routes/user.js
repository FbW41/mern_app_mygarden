const router = require('express').Router();
const User = require('../models/User');
// sign up
router.post('/create', (req, res)=>{
    // save a user
    const newUser = new User(req.body);
    newUser.save((err, doc)=>{
        if(err) throw err.message;
        res.json(doc)
    })
})

// Signin using JWT 
const jwt = require('jsonwebtoken');
router.post('/signinByJWT', (req, res)=>{
    const data = req.body;
    // token = jwt.sign(payload/data, secret key)
    const secret = process.env.JWT_SECRET;// check ur .env file for this
    // encode with sign()
    // Todo: before create token findOne() the user and tokenize the user._id or user
    const token = jwt.sign(data, secret, {
        expiresIn: '1d'// 60*60*24
    });
    res.json(token);
    // for decode and verify the data
})




// sign in and save data to localstorage of frontend
router.post('/signin',(req, res)=>{
    // check a user
    const {email, password} = req.body;
    User.findOne({email, password}, (err, data)=> {
        res.json(data)
    })

})

// Test queries
router.get('/test/queries', (req, res)=>{
    // find all users
    // User.find((err, users)=> {
    //     res.json(users);
    // })
    // find the user called "Jose"
    // method 1
    // User.findOne({username: 'Jose'},(err, users)=> {
    //     res.json(users);
    // })
    // method 2
    // User.find((err, users)=> {
    //     res.json(users);
    // }).where('username').equals('Jose')

    // find all user's email only
    // User.find((err, users)=> {
    //     res.json(users);
    // }).select(['email', 'password'])

    //find all users ascending order and only show 3 users
    User.find((err, users)=> {
        res.json(users);
    }).sort({_id: -1}).limit(3)
})

module.exports = router;

