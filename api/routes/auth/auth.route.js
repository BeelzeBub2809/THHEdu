const express = require('express')
const authMiddlewares = require('../../middlewares/auth.middleware')
const authController = require('../../controllers/auth/auth.controller')
const AuthRouter = express.Router()
AuthRouter.post('/register', [authMiddlewares.checkExistRoles, authMiddlewares.checkDuplicateEmailAuth], authController.register)
AuthRouter.post('/login', authController.login)
AuthRouter.post('/logout', authController.logout)

module.exports = AuthRouter