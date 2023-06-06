const express = require('express');
const router = express.Router();
const { uploadImg } = require('../middleware/storage');
const {
    getGames,
    getGame,
    createGame,
    updateGame,
    deleteGame
} = require('../controllers/gameControllers');


router.get('/', getGames);
router.post('/', uploadImg, createGame);
router.get('/:reqId', getGame);
router.put('/:reqId', uploadImg, updateGame);
router.delete('/:reqId', deleteGame);


module.exports = router;