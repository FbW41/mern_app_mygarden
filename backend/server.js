const express = require('express');
const app = express();
const plantRouter = require('./routes/plant')
const userRouter = require('./routes/user')
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

app.use(express.static(__dirname+ '/public'));
app.use(cors());

app.use(express.json())

// routes as REST API for frontend
app.use('/plant', plantRouter);
app.use('/user', userRouter);

app.listen(5000, ()=>{
    console.log('Backend is running on port 5000')
})


