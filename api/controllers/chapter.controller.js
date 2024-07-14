const { DbChapter } = require('../models/index.js')
const mongoose = require('mongoose')
const ChapterRepo = require('../repositories/chapter.repository.js')

async function createChapterBySubject(req,res,next){
    try {
        const subjectId = req.params.subjectId;
        if (!mongoose.Types.ObjectId.isValid(subjectId)) {
          return res.status(400).json({ message: 'Invalid subject' });
        }
        
        const { title, type, content, attachments, quizzes } = req.body;
        const newChapter = await DbChapter.create({title, content, attachments, type, subjectId, quizzes})
        
        res.status(201).json(newChapter)
      } catch (error) {
        next(error)
      }
}

async function getChapterBySubject(req,res,next){
  try {
    const subjectId = req.params.subjectId;
    if (!mongoose.Types.ObjectId.isValid(subjectId)) {
      return res.status(400).json({ message: 'Invalid subject' });
    }
    const { type } = req.body;

    const chapterList = await ChapterRepo.getChapterBySubject({subjectId, type})

    if(chapterList){
      return res.status(200).json(chapterList)
    }
    return res.status(404).json({message: 'Cannot find this subject'})
  } catch (error) {
    next(error)
  }
}

const ChapterController = {
    createChapterBySubject, getChapterBySubject
}
module.exports = ChapterController