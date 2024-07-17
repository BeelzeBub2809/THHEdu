const express = require('express')
const SubmittedQuizController = require('../controllers/submitted-quiz.controller')
const authMiddlewares = require('../middlewares/auth.middleware')
const SubmittedQuizRouter = express.Router()
SubmittedQuizRouter.post('/submit', [authMiddlewares.verifyUser, authMiddlewares.authorizeRoles(['trainee'])], SubmittedQuizController.submitQuiz)
module.exports = SubmittedQuizRouter