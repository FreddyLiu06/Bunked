const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userBioSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 5,
    }, 
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
    },
    gender: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
    },
    majors: {
        type: [String],
        required: true,
        trim: true,
    }, 
    year: {
        type: String,
        required: true,
    },
    extroversion: {
        type: Number,
        required: true,
    },
    cleanliness: {
        type: Number,
        required: true,
    },
    noise: {
        type: Number,
        reequired: true,
    },
    sleep: {
        start : {
            type: Number,
        }, 
        end : {
            type: Number,
        }
    },
    aboutBio: String,
    guests: Number,
    dorm: [String],
    greek: Number,
    smoke: String,
    drink: String,
    hobbies: [String],
    hometown: String,
    music: [String],
    shows: [String],
    instagram: String,
    hobbies_encoded:[[Number]],
});

const UserBio = mongoose.model('UserBio', userBioSchema);

module.exports = UserBio;