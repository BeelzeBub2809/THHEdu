const express = require('express')
const QuizController = require('../controllers/quiz.controller')
const QuizRouter = express.Router()
QuizRouter.get('/by-subject/:subjectId', QuizController.getQuizBySubject)

module.exports = QuizRouter