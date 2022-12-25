const reviewDatabase1 = require("../sbdt/models").Review;
const reviewDatabase2 = require("../sbdt-2/models").Review;

const userDB1 = require("../sbdt/models").User;
const userDB2 = require("../sbdt-2/models").User;

const getAllReviews = async (req, res) => {
  try {
    const review1 = await reviewDatabase1.findAll();
    const review2 = await reviewDatabase2.findAll();
    return res.json(review1.concat(review2));
  } catch (error) {
    return res.json({ success: false, error });
  }
};

const getReviewById = async (req, res) => {
  const reviewId = req.params.reviewId;
  try {
  } catch (error) {}
};

const addReview = async (req, res) => {
  const { content, start, itemId, userId } = req.body
  try {
    const review = await reviewDatabase1.create({
      content,
      start,
      itemId,
      userId,
    })
    return res.status(201).json({
      error: false,
      message: "new review has been created",
      review,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: true, message: "Error creating a review" });
  }
};

const editReview = async (req, res) => {
  const reviewId = req.params.reviewId;
  const { content, start } = req.body;
  try {
    const isUpdated = await reviewDatabase1.update(
      {
        content,
        start,
      },
      {
        where: { uuid: reviewId },
      }
    );
    if (isUpdated[0] === 1) {
      return res.json({ error: false, message: "item is updated", isUpdated });
    }
    try {
      const isUpdated = await reviewDatabase2.update(
        {
          content,
          start,
        },
        {
          where: { uuid: reviewId },
        }
      );
      return res.json({ success: true, isUpdated });
    } catch (error) {
      return res.json(error);
    }
  } catch (error) {
    console.log(error);
    return res.json({
      error: true,
      message: "something is wrong",
      errorMessage: error,
    });
  }
};

const deleteReview = async (req, res) => {
  const reviewId = req.params.reviewId;
  try {
    const isDestroyed = await reviewDatabase1.destroy({
      where: { uuid: reviewId },
    });
    if (isDestroyed[0] === 0) {
      try {
        const isDestroyed2 = await reviewDatabase2.destroy({
          where: { uuid: reviewId },
        });
        if (isDestroyed2[0] === 0) {
          return res.json({ success: false, result: "data not found" });
        }
        return res.json({ success: true, result: isDestroyed2 });
      } catch (error) {
        return res.json(error);
      }
    }
    return res.json({ success: true, result: isDestroyed });
  } catch (error) {
    return res.json(error);
  }
};
module.exports = {
  getAllReviews,
  editReview,
  deleteReview,
  addReview,
};
