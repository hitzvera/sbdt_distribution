
const express = require('express')
const transactionController = require('../controller/transactions.controller')

const transactoinRouter = express.Router()

transactoinRouter.get('/', transactionController.getAllTransactions)
transactoinRouter.get('/user/:userId', transactionController.getTransactionByUserId)
transactoinRouter.get('/:transactionId', transactionController.getTransactionByItsId)

module.exports = transactoinRouter

