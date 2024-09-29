const express = require('express');
const QuestionsControllers = require('./controllers');

const router = express.Router();

router.post('/', QuestionsControllers.getQuestions);

module.exports = router;

