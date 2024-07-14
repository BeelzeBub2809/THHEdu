const { DbQuiz } = require('../models/index.js')
const  QuizRepo = require('../repositories/quiz.repository.js')
const mongoose = require('mongoose')

async function getQuizBySubject(req,res,next){
  try {
    const subjectId = req.params.subjectId;
    if (!mongoose.Types.ObjectId.isValid(subjectId)) {
      return res.status(400).json({ message: 'Invalid subject' });
    }
    const quizList = await QuizRepo.getQuizBySubject(subjectId)
    if(quizList){
      return res.status(200).json(quizList)
    }
    return res.status(404).json({message: 'Cannot find this subject'})
  } catch (error) {
    next(error)
  }
}

async function createQuizBySubject(req,res,next){
  try {
      const subjectId = req.params.subjectId;
      if (!mongoose.Types.ObjectId.isValid(subjectId)) {
        return res.status(400).json({ message: 'Invalid quiz'});
      }
      
      const { chapterId, quizName, duration, questionId } = req.body;
      const newQuiz = await DbQuiz.create({subjectId, chapterId, quizName, duration, questionId})
      
      res.status(201).json(newQuiz);
    } catch (error) {
      next(error)
    }
}

const QuizController = {
    getQuizBySubject, createQuizBySubject
}
module.exports = QuizController