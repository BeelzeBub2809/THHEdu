const mongoose = require('mongoose')
const { Schema } = mongoose
const assignmentSchema = new Schema({
  assignmentName: {
    type: String,
    required: true,
  },
  createDate: {
    type: Date,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  content: {
    type: Date,
    required: true
  },
  attachment: [{
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  traineeId: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  subjectId: {
    type: Schema.ObjectId,
    ref: 'Subject',
    required: true
  }
})
const Assignment = mongoose.model('Assignment', assignmentSchema)
module.exports = Assignment