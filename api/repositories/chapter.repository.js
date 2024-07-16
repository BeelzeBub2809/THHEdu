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

async function updateChapter({chapterId, ...updateCondition}){
    const updateChapter = await DbChapter.findByIdAndUpdate(
        chapterId,
        {
            $set: {
                title: updateCondition.title,
                type: updateCondition.type,
                content: updateCondition.content,
                attachments: updateCondition.attachments,
                quizzes: updateCondition.quizzes,
                createBy: updateCondition.createBy
            }
        },
        {new: true}
    )
    return updateChapter
}
const ChapterRepo = {
    getChapterBySubject, updateChapter
}
module.exports = ChapterRepo