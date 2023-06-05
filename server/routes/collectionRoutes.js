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
router.post('/', validateTokenHandler, createCollection);
router.delete('/:reqId', validateTokenHandler, deleteCollection);

router.get('/game/:reqId', validateTokenHandler, getCollectionGame);
router.post('/game', validateTokenHandler, addGameToCollection);
router.delete('/game/:reqCol&:reqGam', validateTokenHandler, removeGameFromCollection);

module.exports = router;