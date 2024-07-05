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
async function getAllUser({ page, size, searchString }) {
  let query = {}
  if (searchString) {
    query = {
      $or: [
        { email: { $regex: `.*${searchString}.*`, $options: 'i' } },
        { fullname: { $regex: `.*${searchString}.*`, $options: 'i' } },
        { phone: { $regex: `.*${searchString}.*`, $options: 'i' } }
      ]
    };
  }
  const users = await DbUser.find(query)
    .skip((page - 1) * size)
    .limit(size)
    .populate('roles');
  const filteredUsers = users.map(user => ({
    ...user.toObject(),
    roles: user.roles.map(role => role.name)
  }))
  return filteredUsers
}
async function getDetailUser(userId) {
  const user = await DbUser.findById(userId).populate('roles')
  if (!user) {
    return null;
  }
  const mappedUser = {
    ...user.toObject(),
    roles: user.roles.map(role => role.name)
  }
  return mappedUser
}
async function updateUser({id, email, password, fullname, phone, avatar, status, roles }) {
  const roleObjs = await DbRole.find({ name: { $in: roles } }).exec()
  const roleIds = roleObjs.map(r => r._id.toString())
  console.log(roleIds);
  const updatedUser = await DbUser.findByIdAndUpdate(
    id,
    {
      $set: {
        email: email,
        password: password,
        fullname: fullname,
        phone: phone,
        avatar: avatar,
        status: status,
      },
      $addToSet: {
        roles: { $each: roleIds}
      }
    },
    {new: true, runValidators: true}
  )
  return updatedUser
}
const userAdminRepo = {
  createUser, getAllUser, getDetailUser, updateUser
}
module.exports = userAdminRepo