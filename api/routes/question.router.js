const express = require('express')
const QuestionController = require('../controllers/question.controller')
const QuestionRouter = express.Router()
QuestionRouter.post('/by-subject/:subjectId/create', QuestionController.createQuestionBySubject)
QuestionRouter.post('/by-subject/:subjectId', QuestionController.getQuestionBySubject)

module.exports = QuestionRouter