const mongoose = require('mongoose')
const { Schema } = mongoose
const joinedSubjectSchema = new Schema({
  traineeId: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  subjectId: {
    type: Schema.ObjectId,
    ref: 'Subject',
    required: true
  },
  latestChapter: Number
})
const JoinedSubject = mongoose.model('JoinedSubject', joinedSubjectSchema)
module.exports = JoinedSubject