const express = require('express');
const router = express.Router();
const {
    getGames,
    getGame,
    createGame,
    updateGame,
    deleteGame
} = require('../controllers/gameControllers');


router.get('/', getGames);
router.post('/', createGame);
router.get('/:reqId', getGame);
router.put('/:reqId', updateGame);
router.delete('/:reqId', deleteGame);


module.exports = router;