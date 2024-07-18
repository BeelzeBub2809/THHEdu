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

async function markLearnedChapter({traineeId, subjectId, chapterId}){
  const joinedSubject = await DbJoinedSubject.findOne({ traineeId: traineeId, subject: subjectId});

  if(!joinedSubject.learnedChapter.includes(chapterId)){
    await DbJoinedSubject.findOneAndUpdate(
      { traineeId: traineeId, subject: subjectId},
      { $push: { learnedChapter: chapterId } },
    )
  } else {
  }
}

const joinedSubjectRepo = {
  getAllJoinedSubjectById, addJoinedSubject, markLearnedChapter
}
module.exports = joinedSubjectRepo