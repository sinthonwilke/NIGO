const mongoose = require('mongoose');

const collectionGamesSchema = new mongoose.Schema({
    collection_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collection',
        required: true
    },
    game_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
        required: true
    },
});

module.exports = mongoose.model('collectionGames', collectionGamesSchema);