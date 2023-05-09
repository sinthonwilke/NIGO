const express = require('express');
const router = express.Router();
const {
    home,
    game
} = require('../controllers/controllers');

router.route('/').get(home);
router.route('/game').get(game);

module.exports = router;