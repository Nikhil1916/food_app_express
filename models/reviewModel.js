const moongoose = require("mongoose");
const { db_link } = require("../secrets");
moongoose.connect(db_link)
  .then((db) => {
    console.log("review db connected");
  })
  .catch((err) => {
    console.log(err);
  });

const reviewSchema = moongoose.Schema({
  review: {
    type: String,
    required: [true, `review is required`]
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, `rating is required`]
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  user: {
    type: moongoose.Schema.ObjectId,
    ref: 'userModel',
    required: [true, `review must belong to a user`]
  },
  plan: {
    type: moongoose.Schema.ObjectId,
    ref: 'planModel',
    required: [true, `plan must belong to a user`]
  }
})
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name profileImage"
  }).populate("plan")
  next();
})
const reviewModel = moongoose.model("reviewModel", reviewSchema);
module.exports = reviewModel;