const mongoose = require('mongoose')
const { Schema } = mongoose
const { questionType } = require('../constants/types')

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
  },
  type: {
    type: String, 
    required: true,
    enum: [questionType.MCQ, questionType.MAQ, questionType.BOOLEAN]
  },
  image: {
    type: String,
  },
  code: {
    type: String
  },
  answer: [{
    answerContent: {
      type: String,
      trim: true
    },
    isCorrected: Boolean
  }],
  explain: {
    type: String,
  },
  createBy: {
    type: Schema.ObjectId,
    ref: 'User'
  }
},{
  timestamps: true
})
const DbQuestion = mongoose.model('Question', questionSchema)
module.exports = DbQuestion
