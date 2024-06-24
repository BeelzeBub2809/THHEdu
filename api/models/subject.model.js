const mongoose = require('mongoose')
const { Schema } = mongoose
const subjectSchema = new Schema({
  subjectCode: {
    type: String,
    required: true
  },
  subjectName: {
    type: String,
    required: true
  },
  description: String,
  isActive: {
    type: Boolean
  },
  managerId: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  price: {
    type: Number,
    required: true
  }
})
const DbSubject = mongoose.model('Subject', subjectSchema)
module.exports = DbSubject
