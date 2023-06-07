const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({
    emailSender: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model('Feedback', feedbackSchema);