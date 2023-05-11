const express = require('express');
const router = express.Router();

const {
    getTags,
    getTag,
    createTag,
    updateTag,
    deleteTag
} = require('../controllers/tagControllers');

router.route('/').get(getTags).post(createTag);
router.route('/:reqId').get(getTag).put(updateTag).delete(deleteTag);

module.exports = router;