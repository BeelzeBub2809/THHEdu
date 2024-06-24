const mongoose = require('mongoose')
const {Schema} = mongoose
const userSchema = new Schema({
  email: {
    type: String,
    required: [true,'Email is required'],
    trim: true,
    unique: true,
    match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please fill valid email']
  },
  password: {
    type: String,
    required: [true,'Password is required'],
    trim: true,
    match: [/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_])\S{8,}$/,'Please fill valid password'] //Password must contain 8-20 characters (no spaces) and at least one number, one letter and one special character
  },
  fullname: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  avatar: {
    type: String
  },
  status: {
    type: Boolean
  },
  role: {
    type: Schema.ObjectId,
    ref: 'Role',
    required: true
  }
})
const DbUser = mongoose.model('User', userSchema)
module.exports = DbUser