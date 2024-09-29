const express = require('express');
const UsersControllers = require('./controllers');

const router = express.Router();

router.post('/answer', UsersControllers.checkQuestionAnswer);
router.get('/leaderboard', UsersControllers.getTopTenUsersByPoints);
router.post('/points', UsersControllers.getPointsByEmail);

module.exports = router;

