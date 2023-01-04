const moongoose = require('mongoose');
const { db_link } = require("../secrets");
moongoose.connect(db_link).then((db) => {
  console.log("plan db connected");
})
  .catch((err) => {
    console.log(err);
  })

const planSchema = moongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxLength: [20, `Plan name should not exceed 20 Chars`]
  },
  price: {
    type: Number,
    required: [true, 'Price not entered']
  },
  duration: {
    type: Number,
    required: [true, 'Duration Required']
  },
  discount: {
    type: Number,
    validate: [function () {
      return this.discount <= 50
    }, 'Discount should not exceed 50%']
  },
  ratingsAverage: {
    type: Number,
    default: 0
  },
  nor: { //no of reviews
    type: Number,
    default: 0
  }
})
const planModel = moongoose.model("planModel", planSchema);
module.exports = planModel;