const mongoose = require('mongoose')
const { Schema } = mongoose
const quizSchema = new Schema({
  quizName: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
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
  questionId: [{
    type: Schema.ObjectId,
    ref: 'Question',
  }],
  createBy: {
    type: Schema.ObjectId,
    ref: 'User'
  }
},{
  timestamps: true
})
const DbQuiz = mongoose.model('Quiz',quizSchema)
module.exports = DbQuiz
