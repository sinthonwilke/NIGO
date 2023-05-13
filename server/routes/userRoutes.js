const express = require('express');
const router = express.Router();
const validateTokenHandler = require('../middleware/validateTokenHandler');
const {
    registerUser,
    loginUser,
    logoutUser,
    currentUser
} = require('../controllers/userControllers');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/', validateTokenHandler, currentUser);

module.exports = router;