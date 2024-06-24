const mongoose = require('mongoose')
const { Schema } = mongoose
const questionSchema = new Schema({
  questionName: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  subjectId: {
    type: Schema.ObjectId,
    ref: 'Subject',
    required: true
  },
  chapterId: {
    type: Schema.ObjectId,
    ref: 'Chapter',
    required: true
  },
  answer: {
    answerContent: [{
      type: String,
      trim: true
    }],
    isCorrected: Boolean
  }
})
const Question = mongoose.model('Question', questionSchema)
module.exports = Question