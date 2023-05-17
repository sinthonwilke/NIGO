const asyncHandler = require('express-async-handler');
const gameSchema = require('../models/gameModel');

const getGames = asyncHandler(async (req, res) => {
    const games = await gameSchema.find();
    res.status(200).json(games);
});

const getGame = asyncHandler(async (req, res) => {

});

const createGame = asyncHandler(async (req, res) => {
    const { title, releaseDate, description, platform, link, tags } = req.body;
    const newGame = await gameSchema.create({
        title,
        releaseDate,
        description,
        platform,
        link,
        tags,
    });
    res.status(201).send('created');
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