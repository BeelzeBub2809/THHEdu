const { DbUser } = require('../../models/index.js')
const bcrypt = require('bcrypt')
const {userAdminRepo} = require('../../repositories/admin/admin.repositories.js')
const mongoose = require('mongoose')
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
async function getAllUser(req,res,next){
  try {
    let {page=1, size=15, searchString, roleFilter, statusFilter} = req.query
    size = parseInt(size) >= 15 ? 15 : parseInt(size)
    page = parseInt(page)
    const listUsers = await userAdminRepo.getAllUserWithSearchAndPaginated({page, size, searchString, roleFilter, statusFilter})
    const countUser = await userAdminRepo.getFilteredUsersCount({searchString, roleFilter, statusFilter})
    const maxPage = Math.ceil(countUser/size)
    res.status(200).json({
      size: size,
      maxPage: maxPage,
      users: listUsers
    })
  } catch (error) {
    next(error)
  }
}
async function getDetailUser(req,res,next){
  try {
    const userId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    const user = await userAdminRepo.getDetailUser(userId)
    if(user){
      return res.status(200).json(user)
    }
    return res.status(404).json({message: 'Cannot find this user'})
  } catch (error) {
    next(error)
  }
}
async function updateUser(req, res, next) {
  try {
    const id = req.params.id
    const {
      email,
      password,
      fullname,
      phone,
      avatar,
      status,
      roles
    } = req.body
    const updatedUser = await userAdminRepo.updateUser({id,email,password,fullname,phone,avatar,status,roles})
    res.status(200).json(updatedUser)
  } catch (error) {
    next(error)
  }
}
const userController = {
  createUser,getAllUser, getDetailUser, updateUser
}
module.exports = userController