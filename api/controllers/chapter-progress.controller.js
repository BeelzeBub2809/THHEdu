const { chapterType } = require('../constants/types.js');
const { DbChapterProgress, DbJoinedSubject, DbSubject, DbChapter } = require('../models/index.js')
const mongoose = require('mongoose')

async function getStatusLearningChapters(req,res,next){
  try {
    const traineeId = req.params.traineeId;
    const subjectId = req.params.subjectId;

    const isJoinedSubject = await DbJoinedSubject.findOne({ 
      traineeId: traineeId, 
      subject: subjectId 
    }).exec();
    
    if( isJoinedSubject ){
      let chaptersInSubject = await DbChapter.find({ subjectId : subjectId, isActive: true });

      if(chaptersInSubject){
        let chapterProgress = await DbChapterProgress.find({
          trainee: traineeId,
          chapter: { $in: chaptersInSubject.map(c => c._id)}
        })
        
        if(chapterProgress){
          res.status(201).json(chapterProgress);
        }
      }
    }
  } catch (error) {
    next(error)
  }
}

async function markStatusLearningChapter(req,res,next){
  try {
    const { ...markCondition } = req.body;

    const chapterProgress = await DbChapterProgress.findOne({ 
      trainee: markCondition.traineeId,
      chapter: markCondition.chapterId
    });

    if(!chapterProgress){
      let newChapterProgress;
      if(markCondition.type === chapterType.QUIZ){
        
      } else {
        newChapterProgress = {
          trainee: markCondition.traineeId,
          chapter: markCondition.chapterId,
          isCompleted: true,
          videoProgress: markCondition.videoProgress,
        }
      }
    } else {
    }
  } catch (error) {
    next(error)
  }
}

const ChapterProgressController = {
    getStatusLearningChapters, markStatusLearningChapter
}
module.exports = ChapterProgressController