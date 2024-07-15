const express = require('express')
const QuizController = require('../controllers/quiz.controller')
const authMiddlewares = require('../middlewares/auth.middleware')
const QuizRouter = express.Router()
QuizRouter.get('/by-subject/:subjectId',authMiddlewares.verifyUser, QuizController.getQuizBySubject)
QuizRouter.post('/by-subject/:subjectId',authMiddlewares.verifyUser, QuizController.createQuizBySubject)
module.exports = QuizRouter