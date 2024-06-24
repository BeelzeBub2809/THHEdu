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
  answer: [{
    answerContent: {
      type: String,
      trim: true
    },
    isCorrected: Boolean
  }],
  createBy: {
    type: Schema.ObjectId,
    ref: 'User'
  }
},{
  timestamps: true
})
const DbQuestion = mongoose.model('Question', questionSchema)
module.exports = DbQuestion