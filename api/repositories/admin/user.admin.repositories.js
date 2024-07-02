const { DbUser, DbRole } = require('../../models/index.js')
const bcrypt = require('bcrypt')
async function createUser({ email, password, fullname, phone, avatar, status, roles }) {
  const User = new DbUser({
    email: email,
    password: bcrypt.hashSync(password, parseInt(process.env.HASH_PASSWORD)),
    fullname: fullname,
    phone: phone,
    avatar: avatar,
    status: status
  })
  if (roles) {
    const currentRole = await DbRole.find({ name: { $in: roles } }).exec()
    User.roles = currentRole.map(r => r._id)
  } else {
    const addRole = await DbRole.findOne({ name: 'trainee' }).exec()
    User.roles = [addRole._id]
  }
  const newUser = await DbUser.create(User)
  return newUser
}
const userAdminRepo = {
  createUser
} 
module.exports = userAdminRepo