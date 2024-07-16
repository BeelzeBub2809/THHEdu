const mongoose = require('mongoose')
const { Schema } = mongoose
const joinedSubjectSchema = new Schema({
  traineeId: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  subject: {
    type: Schema.ObjectId,
    ref: 'Subject',
    required: true
  },
  learnedChapter: [
    {
      type: Schema.ObjectId,
      ref: 'Chapter'
    }
  ]
},{
  timestamps: true
})
const DbJoinedSubject = mongoose.model('JoinedSubject', joinedSubjectSchema)
module.exports = DbJoinedSubject