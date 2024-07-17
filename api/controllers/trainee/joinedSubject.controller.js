const DbJoinedSubject = require('../../models/joinedSubject.model.js')
const joinedSubjectRepo = require('../../repositories/trainee/joinedSubject.repository.js')
async function getAllJoinedSubjectById(req, res, next) {
  try {
    const listJoinedSubjects = await joinedSubjectRepo.getAllJoinedSubjectById(req.params.id)
    res.status(200).json(listJoinedSubjects)
  } catch (error) {
    next(error)
  }
}

async function addJoinedSubject(req, res, next) {
  try {
    const {traineeId, subjectId} = req.body
    const newJoinedSubject = await joinedSubjectRepo.addJoinedSubject({traineeId, subjectId})
    res.status(201).json(newJoinedSubject)
  } catch (error) {
    next(error)
  }
}

async function markLearnedChapter(req, res, next) {
  try {
    const {traineeId, subjectId, chapterId } = req.body;
    console.log(traineeId, subjectId, chapterId);
    const joinedSubject = await DbJoinedSubject.findOne({ traineeId: traineeId, subject: subjectId});

    if(!joinedSubject.learnedChapter.includes(chapterId)){
      const marLearnedChapter = await DbJoinedSubject.findOneAndUpdate(
        { traineeId: traineeId, subject: subjectId},
        { $push: { learnedChapter: chapterId } },
      )
      res.status(201).json(marLearnedChapter);
    } else {
      res.status(201)
    }
  } catch (error) {
    next(error)
  }
}

async function getLearnedChapterBySubject(req, res, next) {
  try {
    const traineeId = req.params.traineeId;
    const subjectId = req.params.subjectId;

    const newJoinedSubject = await DbJoinedSubject.findOne({traineeId: traineeId, subject: subjectId})
    res.status(201).json(newJoinedSubject.learnedChapter)
  } catch (error) {
    next(error)
  }
}

const joinedSubjectController = {
  getAllJoinedSubjectById, addJoinedSubject, getLearnedChapterBySubject, markLearnedChapter
}
module.exports = joinedSubjectController