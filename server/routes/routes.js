const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers');

router.route('/').get(controllers.home);

module.exports = router;