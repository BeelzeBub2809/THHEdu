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
    const {traineeId, subjectId, learnedChapter} = req.body
    const newJoinedSubject = await joinedSubjectRepo.addJoinedSubject({traineeId, subjectId, learnedChapter})
    res.status(201).json(newJoinedSubject)
  } catch (error) {
    next(error)
  }
}
const joinedSubjectController = {
  getAllJoinedSubjectById, addJoinedSubject
}
module.exports = joinedSubjectController