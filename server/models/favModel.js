const mongoose = require('mongoose');

const favSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    game_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
        required: true,
        unique: true
    },
});

module.exports = mongoose.model('fav', favSchema);
