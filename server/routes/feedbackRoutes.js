const express = require('express');
const router = express.Router();
const validateTokenHandler = require('../middleware/validateTokenHandler');
const {
    createFeedback,
    getAllFeedbacks
} = require('../controllers/feedbackControllers');

router.get('/', getAllFeedbacks);
router.post('/', validateTokenHandler('admin'), createFeedback);

module.exports = router;