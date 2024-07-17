const express = require('express')
const ChapterController = require('../controllers/chapter.controller')
const authMiddlewares = require('../middlewares/auth.middleware')
const ChapterRouter = express.Router()
ChapterRouter.post('/by-subject/:subjectId/create',[authMiddlewares.verifyUser, authMiddlewares.authorizeRoles(['manager'])], ChapterController.createChapterBySubject)
ChapterRouter.post('/by-subject/:subjectId',[authMiddlewares.verifyUser, authMiddlewares.authorizeRoles(['manager', 'trainee'])], ChapterController.getChapterBySubject)
ChapterRouter.put('/:chapterId/update',[authMiddlewares.verifyUser, authMiddlewares.authorizeRoles(['manager'])], ChapterController.updateChapter)

module.exports = ChapterRouter