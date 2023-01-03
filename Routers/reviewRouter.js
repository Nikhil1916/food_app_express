const express = require("express");
const reviewRouter = express.Router();
const { protectRoute, isAuthorised } = require("../helper");

planRouter
  .route("/all")
  .get(getAllReviews)

planRouter
  .route('/top3')
  .get(top3Review)

planRouter
  .route("/:id")
  .get(getPlanReview)

planRouter
  .route('')
  .post(createReview)

planRouter
  .route('')
  .patch(updateReview)
  .delete(deleteReview)

module.exports = reviewRouter;