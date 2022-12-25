const express = require('express')
const userController = require('../controller/user.controller')

const userRouter = express.Router()

userRouter.get('/', userController.getAllUser)
userRouter.get('/:userId', userController.getUserById)
userRouter.post('/signup', userController.addUser)
userRouter.post('/checkout', userController.checkout)
userRouter.put('/payment/:transactionId', userController.payment)
userRouter.put('/:userId', userController.editUser)
userRouter.delete('/:userId', userController.deleteUser)

module.exports = userRouter