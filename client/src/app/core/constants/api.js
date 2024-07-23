export const api = {
    login: '/auth/login',
    register: '/auth/register',
    getUsers: '/admin/user/list',
    learningQuiz: '/trainee/info-quiz',
    
    getJoinedSubject: '/trainee/joinedSubject/get-by-id/:traineeId',

    getSubjects: '/subject/list',
    getSubject: '/subject/:subjectId',
    createSubject: '/subject/create',
    updateSubject: '/subject/update/:_id',

    getQuizBySubject: '/quiz/by-subject/:subjectId',
    getQuizByChapter: '/quiz/by-chapter/:chapterId',
    createQuizBySubject: '/quiz/by-subject/:subjectId',
    getQuestionByQuiz: '/quiz/:quizId/get-questions',
    
    createChapterBySubject: '/chapter/by-subject/:subjectId/create',
    getChapterBySubject: '/chapter/by-subject/:subjectId',
    updateChapter: '/chapter/:chapterId/update',

    createQuestionBySubject: '/question/by-subject/:subjectId/create',
    getQuestionBySubject: '/question/by-subject/:subjectId',

    submitQuiz: '/submitted-quiz/submit',

    markLearnedChapter: '/trainee/joined-subject/mark-learned-chapter',
    getLearnedChapterBySubject: '/trainee/joined-subject/learned-subject/:traineeId/:subjectId',

    getStatusLearningChapter: '/chapter-progress/status-learning-chapter/:traineeId/:subjectId',
    markStatusLearningChapter: '/chapter-progress/mark-status'
};