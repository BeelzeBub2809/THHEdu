const express = require('express')
const { adminUserController } = require('../../controllers/admin/admin.controller')
const userRouter = express.Router()
userRouter.post('/list', adminUserController.getAllUser)
userRouter.get('/:id', adminUserController.getDetailUser)
userRouter.post('/create', adminUserController.createUser)
userRouter.post('/:id', adminUserController.updateUser)
module.exports = userRouter