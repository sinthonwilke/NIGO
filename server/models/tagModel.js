const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }
});

const tag = mongoose.model('tag', tagSchema);
module.exports = tag;