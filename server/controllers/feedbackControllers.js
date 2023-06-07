const asyncHandler = require('express-async-handler');
const feedbackSchema = require('../models/feedbackModel');


const createFeedback = asyncHandler(async (req, res) => {
    // console.log('createFeedback');
    const createFields = {
        emailSender: req.userEmail,
        subject: req.body.subject,
        details: req.body.details,
        link: req.body.link,
    };
    try {
        await feedbackSchema.create(createFields);
        res.status(201).send('created');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

const getAllFeedbacks = asyncHandler(async (req, res) => {
    const feedbacks = await feedbackSchema.find();
    res.status(200).send(feedbacks);
});


module.exports = {
    createFeedback,
    getAllFeedbacks
};