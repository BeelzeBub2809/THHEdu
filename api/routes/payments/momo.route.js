const express = require('express')
const MomoController = require('../../controllers/payments/momo.controller')
const authMiddlewares = require('../../middlewares/auth.middleware')
const momoRouter = express.Router()
momoRouter.post('/create-payment-link',authMiddlewares.verifyUser,MomoController.createPaymentLink)
momoRouter.post('/receive-momo-data',MomoController.receiveDataFromMomo)
module.exports = momoRouter