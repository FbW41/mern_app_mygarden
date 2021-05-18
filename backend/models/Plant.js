const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// create a Schema 
const plantSchema = new Schema({
    name: String
})

// declare Schema as a model
const Plant = mongoose.model('Plant', plantSchema) 
// export User Model
module.exports = Plant; 

