const express = require('express');
const router = express.Router();
const validateTokenHandler = require('../middleware/validateTokenHandler');
const {
    getCollection,
    updateCollection,
    getCollectionGame,
    createCollection,
    deleteCollection,
    addGameToCollection,
    removeGameFromCollection
} = require('../controllers/collectionControllers');

router.get('/', validateTokenHandler, getCollection);
router.put('/:reqId', validateTokenHandler, updateCollection);
router.get('/game', validateTokenHandler, getCollectionGame);
router.post('/', validateTokenHandler, createCollection);
router.delete('/:reqId', validateTokenHandler, deleteCollection);
router.post('/:reqId', validateTokenHandler, addGameToCollection);
router.delete('/:reqId', validateTokenHandler, removeGameFromCollection);

module.exports = router;