const express = require('express')
const QuizController = require('../controllers/quiz.controller')
const authMiddlewares = require('../middlewares/auth.middleware')
const QuizRouter = express.Router()
QuizRouter.get('/by-subject/:subjectId', authMiddlewares.verifyUser, QuizController.getQuizBySubject)
QuizRouter.post('/by-subject/:subjectId',[authMiddlewares.verifyUser, authMiddlewares.authorizeRoles(['manager'])], QuizController.createQuizBySubject)
QuizRouter.get('/:quizId/get-questions', authMiddlewares.verifyUser, QuizController.getQuestionsByQuiz)
QuizRouter.get('/by-chapter/:chapterId', authMiddlewares.verifyUser, QuizController.getQuizByChapter)

module.exports = QuizRouter