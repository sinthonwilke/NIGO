const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tag',
        required: true
    }]
});

const game = mongoose.model('game', gameSchema);
module.exports = game;