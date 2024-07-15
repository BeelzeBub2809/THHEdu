const express = require('express')
const authMiddlewares = require('../../middlewares/auth.middleware.js')
const joinedSubjectController = require('../../controllers/trainee/joinedSubject.controller.js')
const joinedSubjectRouter = express.Router()
joinedSubjectRouter.get('/joinedSubject/get-by-id/:id',[authMiddlewares.verifyUser], joinedSubjectController.getAllJoinedSubjectById)
joinedSubjectRouter.post('/joinedSubject/create',[authMiddlewares.verifyUser], joinedSubjectController.addJoinedSubject)
module.exports = joinedSubjectRouter