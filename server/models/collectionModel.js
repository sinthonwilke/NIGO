const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('collection', collectionSchema);
