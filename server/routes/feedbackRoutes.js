const express = require('express');
const router = express.Router();
const validateTokenHandler = require('../middleware/validateTokenHandler');
const {
    createFeedback,
    getAllFeedbacks
} = require('../controllers/feedbackControllers');

router.get('/', validateTokenHandler('admin'), getAllFeedbacks);
router.post('/', validateTokenHandler(), createFeedback);

module.exports = router;