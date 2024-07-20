const mongoose = require('mongoose')
const { chapterType } = require('../constants/types')
const { Schema } = mongoose
const chapterSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
  },
  attachments: {
    type: String
  },
  linkVideo: {
    type: String
  },
  type: {
    type: Number,
    enum: [chapterType.LECTURE, chapterType.VIDEO, chapterType.QUIZ]
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
  quizzes: [{
    type: Schema.ObjectId,
    ref: 'Quiz',
  }],
  createBy: {
    type: Schema.ObjectId,
    ref: 'User'
  }
},{
  timestamps: true
})
const DbChapter = mongoose.model('Chapter', chapterSchema)
module.exports = DbChapter
