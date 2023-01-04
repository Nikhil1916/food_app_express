const express = require("express");
const { getAllReviews, getTop3Reviews, createReview, updateReview, deleteReview, getPlanReview } = require("../controller/reviewController");
const reviewRouter = express.Router();
const { protectRoute, isAuthorised } = require("../helper");

reviewRouter
  .route("/all")
  .get(getAllReviews)

reviewRouter
  .route('/top3')
  .get(getTop3Reviews)


reviewRouter.use(protectRoute)
reviewRouter
  .route('/crud/:plan')
  .post(createReview)
  .patch(updateReview)
  .delete(deleteReview)

//all reviews of a particular plan
reviewRouter
  .route("/:id")//plan id
  .get(getPlanReview)

module.exports = reviewRouter;