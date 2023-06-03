const asyncHandler = require('express-async-handler');
const favSchema = require('../models/favModel');

const getFavs = asyncHandler(async (req, res) => {
    const favs = await favSchema.find();
    console.log(req.user);
    res.status(200).json(favs);
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
    const createdFav = await favSchema.create({ user_id: req.user, game_id: req.params.reqId });
    res.status(201).json("created");
});

const deleteFav = asyncHandler(async (req, res) => {
    const deleteFav = await favSchema.findOneAndDelete({ game_id: req.params.reqId });
    res.status(200).json("deleted");
});

module.exports = {
    getFavs,
    isFav,
    createFav,
    deleteFav
};