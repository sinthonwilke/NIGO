const asyncHandler = require('express-async-handler');
const tagSchema = require('../models/tagModel');

const getTags = asyncHandler(async (req, res) => {
    const tags = await tagSchema.find();
    res.status(200).json(tags);
});

const getTag = asyncHandler(async (req, res) => {
});

const createTag = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name } = req.body;
    if (!name) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }
    const tag = await tagSchema.create({
        name
    });
    res.status(201).send('Tag created');
});

const updateTag = asyncHandler(async (req, res) => {
});

const deleteTag = asyncHandler(async (req, res) => {
});

module.exports = {
    getTags,
    getTag,
    createTag,
    updateTag,
    deleteTag
};