const { chapterType } = require('../constants/types.js');
const { DbChapterProgress, DbJoinedSubject, DbSubject, DbChapter } = require('../models/index.js')
const ChapterProgressRepo = require('../repositories/chapter-progress.repository.js');

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
      let response;

      if(markCondition.type == chapterType.LECTURE){
        response = await ChapterProgressRepo.createChapterProgress(markCondition.traineeId, markCondition.chapterId)
      } else if (markCondition.type == chapterType.VIDEO) {
        response = await ChapterProgressRepo.createChapterProgress(markCondition.traineeId, markCondition.chapterId, markCondition.videoProgress)
      } else if (markCondition.type == chapterType.QUIZ){

      }

      res.status(201).json(response);
    } else {
      if( markCondition.type == chapterType.VIDEO){
        const response = await ChapterProgressRepo.updateTimeVideo(markCondition.traineeId, markCondition.chapterId, markCondition.videoProgress)
        res.status(201).json(response)
      }
    }
  } catch (error) {
    next(error)
  }
}

const ChapterProgressController = {
    getStatusLearningChapters, markStatusLearningChapter
}
module.exports = ChapterProgressController