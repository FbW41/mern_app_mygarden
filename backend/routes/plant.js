const router = require('express').Router();
const Plant = require('../models/Plant');
const multer = require('multer');
// settings for multer
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, 'public/images')
    },
    filename: function(req, file, callback) {
        callback(null, Date.now() +'_'+ file.originalname)
    }
});
const upload = multer({storage});
// add one plant to DB
router.post('/add', upload.single('plantPic'),(req, res)=>{
    // data from frontend UI
    const newPlant = new Plant({
        name: req.body.name,
        plantPic: '/images/'+ req.file.filename,
        // todo: this id should come from session or user login or req.body
        added_by: '60acb46ba6365517862ad119'
    })
    newPlant.save((err, doc)=>{
        res.json('A new Plant has been added!')
    })
})
// find all plants
router.get('/all', (req, res)=>{
    Plant.find((err, plants)=>{
        res.json(plants)
    }).populate('added_by').sort({_id: -1}).limit(5)
    // req.body.searchName = 'tomatoes'
    // find all plants name tomatoes
    // Plant.find((err, plants)=>{
    //         res.json(plants)
    //     })
    //     .where('name')
    //     .equals('Tomatoes')
})
// find one plant by id
router.get('/detail/:id', (req, res)=>{
    Plant.findById(req.params.id, (err, doc)=>{
        res.json(doc)
    }).populate('added_by');
})
// update one plant data
router.post('/update', (req, res)=>{
    console.log(req.body)
    Plant.findByIdAndUpdate(req.body.id, req.body, (err, doc)=>{
       res.json('Plant Data just updated!')
    })
})
// delete one plant by id
router.get('/delete/:id', (req, res)=>{
    Plant.findByIdAndDelete(req.params.id, (err, doc)=>{
        res.json('One plant data has been deleted!')
    })
})

module.exports = router;