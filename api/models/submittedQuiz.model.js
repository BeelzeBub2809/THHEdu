const mongoose = require('mongoose')
const { Schema } = mongoose
const submittedQuiz = new Schema({
  mark: {
    type: Number
  },
  answer: {
    type: [String],
    required: true
  },
  traineeId: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  quizId: {
    type: Schema.ObjectId,
    ref: 'Quiz',
    required: true,
  }
})
const SubmittedQuiz = mongoose.model('SubmittedQuiz', submittedQuiz)
module.exports = SubmittedQuiz