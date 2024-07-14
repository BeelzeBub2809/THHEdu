const { DbQuiz } = require('../models/index.js')

async function getQuizBySubject(subjectId) {
    const quizList = await DbQuiz.find({subjectId: subjectId}).populate('subjectId').populate('chapterId');
    if (!quizList) {
        return null;
    }
    return quizList
}

const QuizRepo = {
    getQuizBySubject
}
module.exports = QuizRepo