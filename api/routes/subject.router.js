const express = require('express')
const SubjectController = require('../controllers/subject.controller')
const subjectMiddlewares = require('../middlewares/subject.middlewares')
const authMiddlewares = require('../middlewares/auth.middleware')
const SubjectRouter = express.Router()
SubjectRouter.post('/list',authMiddlewares.verifyUser, SubjectController.getAllSubjects)
SubjectRouter.post('/create', [authMiddlewares.verifyUser, authMiddlewares.authorizeRoles(['manager']),subjectMiddlewares.checkDuplicateSubjectName], SubjectController.createSubject)
SubjectRouter.get('/:id',authMiddlewares.verifyUser, SubjectController.getDetailSubject)
SubjectRouter.put('/update/:id',[authMiddlewares.verifyUser, authMiddlewares.authorizeRoles(['manager'])], SubjectController.updateSubject)

module.exports = SubjectRouter