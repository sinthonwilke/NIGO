const express = require('express');
const router = express.Router();
const validateTokenHandler = require('../middleware/validateTokenHandler');
const {
    getFavs,
    isFav,
    createFav,
    deleteFav
} = require('../controllers/favControllers');

router.get('/', validateTokenHandler, getFavs);
router.get('/:reqId', validateTokenHandler, isFav);
router.post('/:reqId', validateTokenHandler, createFav);
router.delete('/:reqId', validateTokenHandler, deleteFav);

module.exports = router;