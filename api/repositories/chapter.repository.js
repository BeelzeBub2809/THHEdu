const { DbChapter } = require('../models/index.js')

async function getChapterBySubject({...createCondition}){
    const query = {};
    if(createCondition.subjectId){
        query.subjectId = createCondition.subjectId;
    }
    if(createCondition.type){
        query.type = createCondition.type;
    }

    const listChapter = DbChapter.find(query).populate('quizzes');
    return !listChapter ? null : listChapter;
}

const ChapterRepo = {
    getChapterBySubject
}
module.exports = ChapterRepo