export const api = {
    login: '/auth/login',
    getUsers: '/admin/user/list',
    learningQuiz: '/trainee/info-quiz',
    getSubjects: '/subject/list',
    createSubject: '/subject/create',
    updateSubject: '/subject/update/:_id',
    getQuizBySubject: '/quiz/by-subject/:subjectId',
    createChapterBySubject: '/chapter/by-subject/:subjectId/create',
    getChapterBySubject: '/chapter/by-subject/:subjectId',
};