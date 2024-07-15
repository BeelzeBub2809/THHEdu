const express = require('express')
const QuestionController = require('../controllers/question.controller')
const authMiddlewares = require('../middlewares/auth.middleware')
const QuestionRouter = express.Router()
QuestionRouter.post('/by-subject/:subjectId/create',[authMiddlewares.verifyUser, authMiddlewares.authorizeRoles(['manager'])], QuestionController.createQuestionBySubject)
QuestionRouter.post('/by-subject/:subjectId',authMiddlewares.verifyUser, QuestionController.getQuestionBySubject)

module.exports = QuestionRouter