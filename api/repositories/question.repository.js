const { DbQuestion } = require('../models/index.js')

async function createQuestionBySubject({...createCondition}){
    console.log(createCondition);

    const newQuestion = await DbQuestion.create(createCondition);
    return newQuestion;
}


async function getQuestionBySubject({...createCondition}){
    const query = {};
    if(createCondition.subjectId !== ''){
        query.subjectId = createCondition.subjectId;
    }

    const listQuestion = DbQuestion.find(query).populate('subjectId').populate('chapterId');
    return !listQuestion ? null : listQuestion;
}

const QuestionRepo = {
    createQuestionBySubject, getQuestionBySubject
}
module.exports = QuestionRepo