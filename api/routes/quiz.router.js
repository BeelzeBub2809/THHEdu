const express = require('express')
const QuizController = require('../controllers/quiz.controller')
const authMiddlewares = require('../middlewares/auth.middleware')
const QuizRouter = express.Router()
QuizRouter.get('/by-subject/:subjectId', QuizController.getQuizBySubject)
QuizRouter.post('/by-subject/:subjectId', QuizController.createQuizBySubject)
QuizRouter.get('/:quizId/get-questions', QuizController.getQuestionsByQuiz)
module.exports = QuizRouter