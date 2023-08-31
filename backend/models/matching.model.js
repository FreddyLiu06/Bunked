const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const matchingSchema = new Schema({
    
    userA: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
    },
    userB: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
    },
    chatID: {
        type: String,
        required: true,
        minlength: 5,
    }
});

const Matching = mongoose.model('Matching', matchingSchema);

module.exports = Matching;