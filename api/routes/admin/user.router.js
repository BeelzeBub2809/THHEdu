const express = require('express')
const { adminUserController } = require('../../controllers/admin/admin.controller')
const userRouter = express.Router()
userRouter.post('/create', adminUserController.createUser)
module.exports = userRouter