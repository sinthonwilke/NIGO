const express = require('express');
const router = express.Router();
const validateTokenHandler = require('../middleware/validateTokenHandler');
const {
    createFeedback,
    getAllFeedbacks,
    deleteFeedback
} = require('../controllers/feedbackControllers');

router.get('/', validateTokenHandler('admin'), getAllFeedbacks);
router.post('/', validateTokenHandler(), createFeedback);
router.delete('/:reqId', validateTokenHandler('admin'), deleteFeedback);

module.exports = router;