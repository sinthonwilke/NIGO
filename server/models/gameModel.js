const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    platform: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    }
});

module.exports = mongoose.model('game', gameSchema);