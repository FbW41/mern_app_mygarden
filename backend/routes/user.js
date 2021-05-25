const router = require('express').Router();
const User = require('../models/User')
// todo: create a signup and signin form and routes 
// get should be post here if u use req.session or post
router.get('/create', (req, res)=>{
    const user= {
        email: 'jose@gmail.com',
        password: '1234',
        username: 'Jose'
    }
    // save a user
    const newUser = new User(user);
    newUser.save((err, doc)=>{
        res.json(doc)
    })
})

module.exports = router;