const express = require('express')
const { TransactionController } = require('../../controllers/admin/admin.controller')
const authMiddlewares = require('../../middlewares/auth.middleware.js')
const transactionRouter = express.Router()
transactionRouter.get('/list',[authMiddlewares.verifyUser, authMiddlewares.authorizeRoles(['admin'])], TransactionController.getAllTransaction)
module.exports = transactionRouter