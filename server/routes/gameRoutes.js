const express = require('express');
const router = express.Router();
const {
    getGames,
    getGame,
    createGame,
    updateGame,
    deleteGame
} = require('../controllers/gameControllers');

router.route('/').get(getGames).post(createGame);
router.route('/:reqId').get(getGame).put(updateGame).delete(deleteGame);

module.exports = router;