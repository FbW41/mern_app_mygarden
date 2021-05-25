const router = require("express").Router();
const Plant = require("../models/Plant");
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
<<<<<<< HEAD
const upload = multer({ storage });

router.post("/add", upload.single("plantPic"), (req, res) => {
  // data from frontend UI
  const newPlant = new Plant({
    name: req.body.name,
    plantPic: "/images/" + req.file.filename,
    added_by_user: req.session.user._id,
  });

  newPlant.save((err, doc) => {
    res.json("A new Plant has been added!");
  });
});

router.get("/all", (req, res) => {
  Plant.find((err, plants) => {
    res.json(plants);
  }).populate("added_by_user");
});

router.get("/delete/:id", (req, res) => {
  Plant.findByIdAndDelete(req.params.id, (err, doc) => {
    res.json("One plant data has been deleted!");
  });
});
=======
const upload = multer({storage});
// add one plant to DB
router.post('/add', upload.single('plantPic'),(req, res)=>{
    // data from frontend UI
    console.log(req.body, req.file)
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
        console.log(plants)
        res.json(plants)
    }).populate('added_by')
})
// find one plant by id
router.get('/detail/:id', (req, res)=>{
    Plant.findById(req.params.id, (err, doc)=>{
        res.json(doc)
    })
})
// update one plant data
router.post('/update', (req, res)=>{
    Plant.findByIdAndUpdate(req.body.id, req.body, (req, res)=>{
       // todo
    })
})
// delete one plant by id
router.get('/delete/:id', (req, res)=>{
    Plant.findByIdAndDelete(req.params.id, (err, doc)=>{
        res.json('One plant data has been deleted!')
    })
})
>>>>>>> 4d8c03c8c767a4965fb267d258d9ec55127eb82b

module.exports = router;
