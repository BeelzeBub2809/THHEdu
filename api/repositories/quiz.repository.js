const { DbQuiz } = require('../models/index.js')

async function getQuizBySubject(subjectId) {
    const quizList = await DbQuiz.find({subjectId: subjectId});
    if (!quizList) {
        return null;
    }
    return quizList
}

const QuizRepo = {
    getQuizBySubject
}
module.exports = QuizRepo