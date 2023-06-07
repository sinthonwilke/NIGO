const express = require('express');
const router = express.Router();
const validateTokenHandler = require('../middleware/validateTokenHandler');
const {
    getFav,
    getFavGame,
    createFav,
    deleteFav
} = require('../controllers/favControllers');

router.get('/', validateTokenHandler(), getFav);
router.get('/games', validateTokenHandler(), getFavGame);
router.post('/:reqId', validateTokenHandler(), createFav);
router.delete('/:reqId', validateTokenHandler(), deleteFav);

module.exports = router;