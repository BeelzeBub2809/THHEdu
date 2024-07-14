const express = require('express')
const ChapterController = require('../controllers/chapter.controller')
const ChapterRouter = express.Router()
ChapterRouter.post('/by-subject/:subjectId/create', ChapterController.createChapterBySubject)
ChapterRouter.post('/by-subject/:subjectId', ChapterController.getChapterBySubject)

module.exports = ChapterRouter