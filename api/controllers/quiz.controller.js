const { DbQuiz, DbChapter } = require('../models/index.js')
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
      
      //TODO: Add minMark for input from frontend
      const { chapterId, quizName, duration, questionId, minMark = 80 } = req.body;
      const newQuiz = await DbQuiz.create({subjectId, chapterId, quizName, duration, questionId, minMark})
      
      res.status(201).json(newQuiz);
    } catch (error) {
      next(error)
    }
}

async function getQuestionsByQuiz(req,res,next){
  try {
      const quizId = req.params.quizId;
      if (!mongoose.Types.ObjectId.isValid(quizId)) {
        return res.status(400).json({ message: 'Invalid quiz'});
      }
      const listQuestions = await DbQuiz.findOne({_id: quizId}).populate('questionId');
      
      res.status(201).json(listQuestions);
    } catch (error) {
      next(error)
    }
}

async function getQuizByChapter(req,res,next){
  try {
      const chapterId = req.params.chapterId;
      if (!mongoose.Types.ObjectId.isValid(chapterId)) {
        return res.status(400).json({ message: 'Invalid chapter'});
      }
      const chapter = await DbChapter.findOne({_id: chapterId}).populate('quizzes');
      
      res.status(201).json(chapter.quizzes);
    } catch (error) {
      next(error)
    }
}

const QuizController = {
    getQuizBySubject, createQuizBySubject, getQuestionsByQuiz, getQuizByChapter
}
module.exports = QuizController