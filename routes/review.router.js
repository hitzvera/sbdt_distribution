const express = require('express')
const reviewController = require('../controller/reviews.controller')

const reviewRouter = express.Router()

reviewRouter.get('/', reviewController.getAllReviews)
reviewRouter.put('/:reviewId', reviewController.editReview)
reviewRouter.delete('/:reviewId', reviewController.deleteReview)

module.exports = reviewRouter