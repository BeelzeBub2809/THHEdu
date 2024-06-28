const mongoose = require('mongoose')
const { Schema } = mongoose
const submittedQuiz = new Schema({
  mark: {
    type: Number
  },
  choice: [{
    type: String,
    trim: true
  }],
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
const DbSubmittedQuiz = mongoose.model('SubmittedQuiz', submittedQuiz)
module.exports = DbSubmittedQuiz