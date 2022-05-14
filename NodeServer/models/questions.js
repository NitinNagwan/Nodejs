const mongoose = require('mongoose')
const validator = require("validator");

const questionSchema = mongoose.Schema({
    question:{
        type: String,
        required: true,
    },
    options: {
        type: Array,
        required: true, 
    },
    answer: {
        type: String,
        required: true
    }

},{timestamps: true})

module.exports = mongoose.model("Questions", questionSchema);