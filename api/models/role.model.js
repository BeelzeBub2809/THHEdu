const mongoose = require('mongoose')
const {Schema} = mongoose
const roleSchema = new Schema({
  name: {
    type: String,
    required: true
  }
})
const DbRole = mongoose.model('Role', roleSchema)
module.exports = DbRole