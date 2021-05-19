const express = require('express');
const app = express();
const plantRouter = require('./routes/plant')
const cors = require('cors')
// Mongodb connection using mongoose module
const mongoose = require('mongoose');
require('dotenv').config()
mongoose.connect(process.env.DB_LINK, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(()=> console.log('MongoDB database is Successfully connected'))
.catch(()=> console.log('Database connection failed!'))
app.use(cors());

app.use(express.json())

// routes as REST API for frontend
app.use('/plant', plantRouter);
app.post('/user/data', (req, res)=> {
    // some data from frontend react UI
    console.log(req.body)
    // Save data to database
    // change or use data and send back message to fronend 
    res.json({
        msg: 'successfully received!',
        username: req.body.username,
        age: 32,
        country: 'germany'
    })
})

app.listen(5000, ()=>{
    console.log('Backend is running on port 5000')
})