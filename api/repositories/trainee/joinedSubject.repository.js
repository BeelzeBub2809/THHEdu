const { DbJoinedSubject }= require('../../models/index.js')

async function getAllJoinedSubjectById(traineeId) {
  const listJoinedSubjects = await DbJoinedSubject.find({traineeId: traineeId})
  return listJoinedSubjects
} 

async function addJoinedSubject({traineeId, subjectId, learnedChapter}) {
  const joinedSubject = {
    traineeId: traineeId,
    subjectId: subjectId,
    learnedChapter: learnedChapter
  }
  const newJoinedSubject = await DbJoinedSubject.create(joinedSubject)
  return newJoinedSubject
}

const joinedSubjectRepo = {
  getAllJoinedSubjectById, addJoinedSubject
}
module.exports = joinedSubjectRepo