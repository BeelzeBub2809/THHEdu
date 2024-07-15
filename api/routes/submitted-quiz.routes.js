const express = require('express')
const SubmittedQuizController = require('../controllers/submitted-quiz.controller')
const SubmittedQuizRouter = express.Router()
SubmittedQuizRouter.post('/submit', SubmittedQuizController.submitQuiz)
module.exports = SubmittedQuizRouter