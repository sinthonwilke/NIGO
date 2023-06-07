const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

    bio: {
        type: String,
        default: '',
    },

    profilePicture: {
        type: String,
        default: 'assets/userImg/default.jpg',
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('user', userSchema);;