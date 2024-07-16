const { DbJoinedSubject }= require('../../models/index.js')

async function getAllJoinedSubjectById(traineeId) {
  const listJoinedSubjects = await DbJoinedSubject.find({traineeId: traineeId})
  return listJoinedSubjects
} 

async function addJoinedSubject({traineeId, subjectId}) {
  const joinedSubject = {
    traineeId: traineeId,
    subject: subjectId
  }
  const newJoinedSubject = await DbJoinedSubject.create(joinedSubject)
  return newJoinedSubject
}

const joinedSubjectRepo = {
  getAllJoinedSubjectById, addJoinedSubject
}
module.exports = joinedSubjectRepo