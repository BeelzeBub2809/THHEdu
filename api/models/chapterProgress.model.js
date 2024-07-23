const mongoose = require('mongoose')
const { Schema } = mongoose
const chapterProgressSchema = new Schema({
  trainee: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  chapter: {
    type: Schema.ObjectId,
    ref: 'Chapter',
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  completedQuizzes: [{
    submittedQuiz: {
      type: Schema.ObjectId,
      ref: 'SubmittedQuiz',
    },
  }],
  videoProgress: {
    type: Number,
    default: 0
  }
},{
  timestamps: true
})
const DbChapterProgress = mongoose.model('ChapterProgress', chapterProgressSchema)
module.exports = DbChapterProgress
