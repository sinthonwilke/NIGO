const asyncHandler = require('express-async-handler');
const favSchema = require('../models/favModel');
const gameSchema = require('../models/gameModel');

const getFavGame = asyncHandler(async (req, res) => {
    const fav = await favSchema.find({ user_id: req.user }, { 'game_id': 1, '_id': 0 }).lean();
    const favGameIds = fav.map(item => item.game_id);
    const favGames = await gameSchema.find({ _id: { $in: favGameIds } });
    res.status(200).json(favGames);
});

const isFav = asyncHandler(async (req, res) => {
    const fav = await favSchema.findOne({
        user_id: req.user,
        game_id: req.params.reqId
    });
    if (fav) {
        res.status(200).json(true);
    } else {
        res.status(200).json(false);
    }
});

const createFav = asyncHandler(async (req, res) => {
    await favSchema.create({ user_id: req.user, game_id: req.params.reqId });
    res.status(201).json("created");
});

const deleteFav = asyncHandler(async (req, res) => {
    await favSchema.findOneAndDelete({ game_id: req.params.reqId });
    res.status(200).json("deleted");
});

module.exports = {
    getFavGame,
    isFav,
    createFav,
    deleteFav
};