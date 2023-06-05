const asyncHandler = require('express-async-handler');
const collectionSchema = require('../models/collectionModel');
const collectionGamesSchema = require('../models/collectionGamesModel');
const gameSchema = require('../models/gameModel');


const getCollection = asyncHandler(async (req, res) => {
    const collection = await collectionSchema.find({ user_id: req.user }, { user_id: 0 });
    res.status(200).json(collection);
});

const getCollectionGame = asyncHandler(async (req, res) => {
    const gamesId = await collectionGamesSchema.find({
        collection_id: req.params.reqId,
    }).select({ game_id: 1 });
    const games = await gameSchema.find({
        _id: {
            $in: gamesId.map((game) => game.game_id),
        },
    });
    res.status(200).json(games);
});

const createCollection = asyncHandler(async (req, res) => {
    await collectionSchema.create({
        user_id: req.user,
        name: req.body.name,
    });
    res.status(201).json("created");
});

const updateCollection = asyncHandler(async (req, res) => {
    await collectionSchema.findOneAndUpdate({ _id: req.params.reqId }, { name: req.body.name });
    res.status(200).json("updated");
});

const deleteCollection = asyncHandler(async (req, res) => {
    await collectionSchema.findOneAndDelete({ _id: req.params.reqId });
    await collectionGamesSchema.deleteMany({ collection_id: req.params.reqId });
    res.status(200).json("deleted");
});

const addGameToCollection = asyncHandler(async (req, res) => {
    await collectionGamesSchema.create({
        collection_id: req.body.collection_id,
        game_id: req.body.game_id,
    });
    res.status(200).json("added");
});

const removeGameFromCollection = asyncHandler(async (req, res) => {
    await collectionGamesSchema.findOneAndDelete({
        _id: req.params.reqId
    });
    res.status(200).json("removed");
});

module.exports = {
    getCollection,
    updateCollection,
    getCollectionGame,
    createCollection,
    deleteCollection,
    addGameToCollection,
    removeGameFromCollection
};
