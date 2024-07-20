const mongoose = require('mongoose')
const { Schema } = mongoose
const submittedQuiz = new Schema({
  mark: {
    type: Number
  },
  isPassed:{
    type: Boolean,
    required: true,
  },
  choice: [{
    questionId: String,
    choicePerQuestion: []
  }],
  traineeId: {
    type: Schema.ObjectId,
    ref: 'User',
  },
  quizId: {
    type: Schema.ObjectId,
    ref: 'Quiz',
    required: true,
  },
  time: Number,
},{
  timestamps: true
})
const DbSubmittedQuiz = mongoose.model('SubmittedQuiz', submittedQuiz)
module.exports = DbSubmittedQuiz
