const { DbUser } = require('../../models/index.js')
const bcrypt = require('bcrypt')
const {userAdminRepo} = require('../../repositories/admin/admin.repositories.js')
async function createUser(req, res, next) {
  try {
    const {
      email,
      password,
      fullname,
      phone,
      avatar,
      status,
      roles
    } = req.body
    const newUser = await userAdminRepo.createUser({email,password,fullname,phone,avatar,status,roles})
    res.status(200).json(newUser)
  } catch (error) {
    next(error)
  }
}
const userController = {
  createUser
}
module.exports = userController