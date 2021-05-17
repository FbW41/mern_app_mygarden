const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors());

app.use(express.json())

// routes as REST API for frontend
app.get('/user/data', (req, res)=> {
  res.json('test work')
})

app.post('/user/data', (req, res)=> {
    // some data from frontend react UI
    console.log(req.body)
    // Save data to database
    // change or use data and send back message to fronend 
    res.json({
        msg: 'successfully received!',
        username: req.body.username
    })
})

app.listen(5000, ()=>{
    console.log('Backend is running on port 5000')
})