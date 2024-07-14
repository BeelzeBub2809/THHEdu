const { DbQuestion } = require('../models/index.js');
const mongoose = require('mongoose');
const QuestionRepo = require('../repositories/question.repository');

async function createQuestionBySubject(req,res,next){
    try {
        const subjectId = req.params.subjectId;
        if (!mongoose.Types.ObjectId.isValid(subjectId)) {
          return res.status(400).json({ message: 'Invalid subject' });
        }
        const { questionName, chapterId, type, answer, explain } = req.body;

        const newChapter = await QuestionRepo.createQuestionBySubject({questionName, subjectId, chapterId, type, answer, explain});
        res.status(201).json(newChapter)
      } catch (error) {
        next(error);
      }
}

async function getQuestionBySubject(req,res,next){
    try {
        const subjectId = req.params.subjectId;
        if ( subjectId !== '' &&  !mongoose.Types.ObjectId.isValid(subjectId)) {
            return res.status(400).json({ message: 'Invalid subject' });
        }
        const questionList = await QuestionRepo.getQuestionBySubject({subjectId: subjectId});
        if(questionList){
            return res.status(200).json(questionList)
        }
        return res.status(404).json({message: 'Cannot find this subject'})
    } catch (error) {
        next(error)
    }
}

const QuestionController = {
    createQuestionBySubject, getQuestionBySubject
}
module.exports = QuestionController