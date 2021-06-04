const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// advance schema
const userSchema = new Schema({
    //email: String,
    /**
     * email: mandatory
     */
    email: { 
        type: String,
    },
    password: {
        type: String,
    },
    username: {type: 'string', default: 'bob'},
    name: {
        firstName: {
            type: String,
            required: [true, 'Please give your first name'],
            default: 'Test'
        },
        lastName: {
            type: String,
            required: [true, 'Please give your last name'],
            default: 'Default lastname'
        }
    },
    age: { type: Number, min: 16, max: 70},
    friendList: [String], // just a array of list of name["ashik, "hiba", "lara"]
    friends: [Schema.Types.ObjectId], // [5127471212, 87182771267, 78687126126],
    fav_movies: [
        {
            title: String,
            detail: String,
            rate: Number
        }
    ],
    country: {type: String, enum: ['Germany', 'Russia']},
    language_code: {
        type: String, 
        enum: ["en","de","uk"]
    }, // list of options: "de", "en", "uk"
    gender: { type: Boolean, default: true}, // true- male, false- female
    profile_pic: {
        type: String,
        default: '/images/1621512876735_apple.jpeg'
    },
    other_pics: [
        {
            filename: String,
            size: String,
            originalname: String
        }
    ],
    github_id: String,  
    facebook_id: String
});

const User = mongoose.model('User', userSchema);
module.exports = User;