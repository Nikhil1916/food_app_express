const planModel = require("../models/planModel");
const reviewModel = require("../models/reviewModel");

module.exports.getAllReviews = async function (req, res) {
  try {
    const reviews = await reviewModel.find();
    if (reviews) {
      res.json({
        msg: "reviews found",
        reviews
      })
    } else {
      res.json({
        msg: `No reviews found`
      })
    }
  } catch (err) {
    res.json({
      msg: err.message
    })
  }
}

module.exports.getTop3Reviews = async function (req, res) {
  try {
    const reviews = await reviewModel.find().sort({ rating: -1 }).limit(3);
    if (reviews) {
      res.json({
        msg: `top ${reviews.length} reviews found`,
        reviews
      })
    } else {
      res.json({
        msg: `No reviews found`
      })
    }
  } catch (err) {
    res.json({
      msg: err.message
    })
  }
}

module.exports.getPlanReview = async function (req, res) {
  try {
    const planId = req.params.id;
    let reviews = await reviewModel.find();
    // try toString or valueof() on id as getting new Object()   
    reviews = reviews.filter((review) => review.plan?.["_id"]?.toString() == planId);
    if (reviews) {
      res.json({
        msg: `reviews found`,
        reviews
      })
    } else {
      res.json({
        msg: `No reviews found`
      })
    }
  } catch (err) {
    res.json({
      msg: err.message
    })
  }
}

module.exports.createReview2 = async function (req, res) {
  try {
    const planId = req.params.plan;
    const plan = await planModel.findById(planId);
    const reviewData = req.body;
    plan.ratingsAverage = ((plan.ratingsAverage * plan.nor) + reviewData.rating) / (plan.nor + 1);
    plan.nor += 1;
    await plan.save();
    const postReview = await reviewModel.create(reviewData);
    await postReview.save();
    res.json({
      msg: "review posted",
      postReview
    })
  } catch (err) {
    res.status(500).json({
      msg: err.message,
    });
  }
}

module.exports.createReview = async function (req, res) {
  try {
    const planId = req.params.plan;
    let reviews = await reviewModel.find();
    reviews = reviews.filter((review) => review.plan["_id"] == planId);
    console.log(reviews.length, 2);
    const reviewData = req.body;
    reviews.forEach((review) => {
      console.log(review.user["_id"], reviewData.user, "pl")
    })
    if (reviews.forEach((review) => {
      console.log(review.user["_id"], reviewData.user)
      return review.user["_id"] == reviewData.user
    })) {
      res.json({
        msg: "User already has added a review plz edit that if necessary."
      })
    }
    console.log(reviews);
    const plan = await planModel.findById(planId);
    plan.ratingsAverage = ((plan.ratingsAverage * plan.nor) + reviewData.rating) / (plan.nor + 1);
    plan.nor += 1;
    await plan.save();
    const postReview = await reviewModel.create(reviewData);
    await postReview.save();
    res.json({
      msg: "review posted",
      postReview
    })
  } catch (err) {
    res.status(500).json({
      msg: err.message,
    });
  }
}

module.exports.updateReview = async function (req, res) {
  try {
    const planId = req.params.plan;
    const id = req.body.id;
    let dataToBeUpdated = req.body;
    let keys = [];
    for (let key in dataToBeUpdated) {
      if (key == id) continue;
      keys.push(key);
    }
    let review = await reviewModel.findById(id);
    if (keys.includes('rating') && dataToBeUpdated['rating'] != review['rating']) {
      console.log(dataToBeUpdated['rating'], review['rating']);
      const plan = await planModel.findById(planId);
      console.log(plan, review.rating, dataToBeUpdated.rating);
      plan.ratingsAverage = (((plan.ratingsAverage * plan.nor) - review.rating) + dataToBeUpdated.rating) / plan.nor;
      console.log(((plan.ratingsAverage * plan.nor) - review.rating) + dataToBeUpdated.rating, plan.ratingsAverage, plan);
      await plan.save();
      review = await reviewModel.findById(id); //calling again as plan is modified and as pre midware catches the old plan value
    }
    for (let i = 0; i < keys.length; i++) {
      review[keys[i]] = dataToBeUpdated[keys[i]];
    }
    await review.save();
    res.json({
      msg: "plan updated successfully",
      review
    })
  } catch (err) {
    res.json({
      msg: err.message,
    });
  }
}

module.exports.deleteReview = async function (req, res) {
  try {
    const planId = req.params.plan;
    const id = req.body.id;
    const plan = await planModel.findById(planId);
    const review = await reviewModel.findById(id);
    if (review) {
      plan.ratingsAverage = ((plan.ratingsAverage * plan.nor) - review.rating) / (plan.nor - 1);
      plan.nor -= 1;
      await plan.save();
      const reviewDel = await reviewModel.findByIdAndDelete(id);
      res.json({
        msg: "review deleted",
        review: reviewDel
      })
    } else {
      res.json({
        msg: "review not found in db"
      })
    }
  } catch (err) {
    res.json({
      msg: err.message,
    });
  }
}
