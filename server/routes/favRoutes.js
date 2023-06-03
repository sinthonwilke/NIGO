const express = require('express');
const router = express.Router();
const validateTokenHandler = require('../middleware/validateTokenHandler');
const {
    getFavs,
    createFav,
    deleteFav
} = require('../controllers/favControllers');

router.get('/', validateTokenHandler, getFavs);
router.post('/:reqId', validateTokenHandler, createFav);
router.delete('/:reqId', validateTokenHandler, deleteFav);

module.exports = router;