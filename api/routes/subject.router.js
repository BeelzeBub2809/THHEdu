const express = require('express')
const SubjectController = require('../controllers/subject.controller')
const subjectMiddlewares = require('../middlewares/subject.middlewares')
const SubjectRouter = express.Router()
SubjectRouter.post('/list', SubjectController.getAllSubjects)
SubjectRouter.post('/create', [subjectMiddlewares.checkDuplicateSubjectName], SubjectController.createSubject)
SubjectRouter.get('/:id', SubjectController.getDetailSubject)
SubjectRouter.put('/update/:id', SubjectController.updateSubject)

module.exports = SubjectRouter