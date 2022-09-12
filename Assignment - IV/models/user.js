const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    mobile: String,
    password: String,
    gender: String,
    role: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('users', userSchema);