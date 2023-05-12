const express = require('express');
const router = express.Router();
const validateTokenHandler = require('../middleware/validateTokenHandler');
const {
    registerUser,
    loginUser,
    currentUser
} = require('../controllers/userControllers');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/current', validateTokenHandler, currentUser);

module.exports = router;