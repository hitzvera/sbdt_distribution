const express = require('express')
const itemsRoute = express.Router()
const itemsController = require('../controller/items.controller')

itemsRoute.get('/', itemsController.getAllItems)
itemsRoute.post('/', itemsController.addItem)
itemsRoute.get('/:itemId', itemsController.getItemById)
itemsRoute.put('/:itemId', itemsController.editItemById)
itemsRoute.delete('/:itemId', itemsController.deleteItem)

module.exports = itemsRoute