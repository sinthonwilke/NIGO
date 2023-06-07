const express = require('express');
const router = express.Router();
const validateTokenHandler = require('../middleware/validateTokenHandler');
const { uploadImg } = require('../middleware/storage');
const {
    getGames,
    searchGames,
    getGame,
    createGame,
    updateGame,
    deleteGame
} = require('../controllers/gameControllers');

router.get('/:reqId', getGame);
router.get('/', getGames);
router.get('/search/:reqId', searchGames);

router.post('/', validateTokenHandler('admin'), uploadImg, createGame);
router.put('/:reqId', validateTokenHandler('admin'), uploadImg, updateGame);
router.delete('/:reqId', validateTokenHandler('admin'), deleteGame);


module.exports = router;