const router = require('express').Router();
const Plant = require('../models/Plant')
router.post('/add', (req, res)=>{
    console.log(req.body)
    const newPlant = new Plant(req.body)
    newPlant.save((err, doc)=>{
        res.json('A new Plant has been added!')
    })
})

module.exports = router;