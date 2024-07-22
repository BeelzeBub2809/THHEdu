const DbJoinedSubject = require('../../models/joinedSubject.model.js')
const JoinedSubjectRepo = require('../../repositories/trainee/joinedSubject.repository.js')
async function getAllJoinedSubjectById(req, res, next) {
  try {
    const listJoinedSubjects = await JoinedSubjectRepo.getAllJoinedSubjectById(req.params.id)
    res.status(200).json(listJoinedSubjects)
  } catch (error) {
    next(error)
  }
}

async function addJoinedSubject(req, res, next) {
  try {
    const {traineeId, subjectId} = req.body
    const newJoinedSubject = await JoinedSubjectRepo.addJoinedSubject({traineeId, subjectId})
    res.status(201).json(newJoinedSubject)
  } catch (error) {
    next(error)
  }
}

async function markLearnedChapter(req, res, next) {
  try {
    const {traineeId, subjectId, chapterId } = req.body;

    let isMarked = await JoinedSubjectRepo.markLearnedChapter({traineeId, subjectId, chapterId});

    res.status(201).json(isMarked);
    
  } catch (error) {
    next(error)
  }
}

async function getLearnedChapterBySubject(req, res, next) {
  try {
    const traineeId = req.params.traineeId;
    const subjectId = req.params.subjectId;

    const newJoinedSubject = await DbJoinedSubject.findOne({traineeId: traineeId, subject: subjectId});
    res.status(201).json(newJoinedSubject.learnedChapter)
  } catch (error) {
    next(error)
  }
}

const joinedSubjectController = {
  getAllJoinedSubjectById, addJoinedSubject, getLearnedChapterBySubject, markLearnedChapter
}
module.exports = joinedSubjectController