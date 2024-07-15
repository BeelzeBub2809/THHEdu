const { DbUser, DbRole } = require("../../models")
const bcrypt = require('bcrypt')
async function register({ email, password, status, roles }) {
  const User = new DbUser({
    email: email,
    password: bcrypt.hashSync(password, parseInt(process.env.HASH_PASSWORD)),
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

async function login (email){
  const user = await DbUser.findOne({email: email})
  return user
}

async function getRoleNameByIds(roleIds) {
  const roles = await DbRole.find({ _id: { $in: roleIds } });
  return roles.map(role => role.name);
}

const authRepository = {
  register, login, getRoleNameByIds
}
module.exports = authRepository