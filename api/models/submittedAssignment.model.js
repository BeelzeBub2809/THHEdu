const mongoose = require('mongoose')
const { Schema } = mongoose
const submittedAssignment = new Schema({
  mark: {
    type: Number
  },
  isSubmit: {
    type: Boolean,
    required: true,
    default: false
  },
  submitTime: {
    type: Date,
    default: Date.now
  },
  answer: {
    type: String
  },
  traineeId: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  assignmentId: {
    type: Schema.ObjectId,
    ref: 'Assignment',
    required: true
  }
})
const SubmittedAssignment = mongoose.model('SubmittedAssignment', submittedAssignment)
module.exports = SubmittedAssignment