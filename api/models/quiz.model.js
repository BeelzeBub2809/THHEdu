const mongoose = require('mongoose')
const { Schema } = mongoose
const quizSchema = new Schema({
  quizName: {
    type: String,
    required: true
  },
  totalQuestion: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    enum: ['random','fixed']
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
  questionId: {
    type: Schema.ObjectId,
    ref: 'Question',
    required: true
  },
  createBy: {
    type: Schema.ObjectId,
    ref: 'User'
  }
},{
  timestamps: true
})
const DbQuiz = mongoose.model('Quiz',quizSchema)
module.exports = DbQuiz