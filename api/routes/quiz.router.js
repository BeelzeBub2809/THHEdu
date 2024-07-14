const express = require('express')
const QuizController = require('../controllers/quiz.controller')
const QuizRouter = express.Router()
QuizRouter.get('/by-subject/:subjectId', QuizController.getQuizBySubject)
QuizRouter.post('/by-subject/:subjectId', QuizController.createQuizBySubject)
module.exports = QuizRouter