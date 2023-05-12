const asyncHandler = require('express-async-handler');
const gameSchema = require('../models/gameModel');
const tagSchema = require('../models/tagModel');


const getGames = asyncHandler(async (req, res) => {
    const games = await gameSchema.find().populate('tags', 'name');
    res.status(200).json(games);
});

const getGame = asyncHandler(async (req, res) => {

});

const createGame = asyncHandler(async (req, res) => {
    const { title, tags } = req.body;
    const existingTags = await tagSchema.find({ name: { $in: tags } });
    const existingTagNames = existingTags.map(tag => tag.name);
    const notFoundTags = tags.filter(tagName => !existingTagNames.includes(tagName));
    if (notFoundTags.length > 0) {
        res.status(400).send(`Tags not found: ${notFoundTags.join(', ')}`);
        return;
    }
    const newGame = await gameSchema.create({
        title,
        tags: existingTags.map(tag => tag._id),
    });
    res.status(201).send('Game created');
});

const updateGame = asyncHandler(async (req, res) => {

});

const deleteGame = asyncHandler(async (req, res) => {

});

module.exports = {
    getGames,
    getGame,
    createGame,
    updateGame,
    deleteGame
};