const express = require('express')
const ChapterProgressController = require('../controllers/chapter-progress.controller')
const authMiddlewares = require('../middlewares/auth.middleware')
const ChapterProgressRouter = express.Router()
ChapterProgressRouter.get('/status-learning-chapter/:traineeId/:subjectId',
    [
        authMiddlewares.verifyUser, 
        authMiddlewares.authorizeRoles(['trainee'])
    ], 
    ChapterProgressController.getStatusLearningChapters
);
ChapterProgressRouter.post('/mark-status',
    [
        authMiddlewares.verifyUser, 
        authMiddlewares.authorizeRoles(['trainee'])
    ], 
    ChapterProgressController.markStatusLearningChapter
);

module.exports = ChapterProgressRouter