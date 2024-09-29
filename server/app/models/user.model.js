const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    name: {
        type: String,
        required: true,
    },
    points: {
        type: Number,
        required: true,
        default: 0,
    },
}, { collection: "users" });

// Create a User model from the schema
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
