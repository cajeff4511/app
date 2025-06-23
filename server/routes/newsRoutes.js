const express = require('express');
const router = express.Router();
const { getNPRNews } = require('../controllers/newsController');

router.get('/cnn', getNPRNews);

module.exports = router;
