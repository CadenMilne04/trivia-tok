const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    term: {
        type: String,
        required: true,
    },
    page: {
        type: Number,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true
    },
    choice1: {
        type: String,
        required: true
    },
    choice2: {
        type: String,
        required: true
    },
    choice3: {
        type: String,
        required: true
    },
    choice4: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
}, { collection: "questions" });

// Create a User model from the schema
const Question = mongoose.model('Question', questionSchema);

// Export the User model
module.exports = Question;
