const mongoose = require('mongoose')
const { Schema } = mongoose
const chapterSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  attachments: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  subjectId: {
    type: Schema.ObjectId,
    ref: 'Subject',
    required: true
  }
})