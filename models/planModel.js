const moongoose = require('mongoose');
const { validate } = require('moongose/models/user_model');
const { db_link } = require("../secrets");
moongoose.connect(db_link).then((db) => {
  console.log("plan db connectes");
})
  .catch((err) => {
    console.log(err);
  })

const planSchema = moongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxLength: [20, 'Plan name should not exceed 20 Chars']
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
    type: Number
  }
})
const planModel = moongoose.model("planModel", planSchema);

(async function createPlan() {
  const plan = {
    name: 'gold',
    price: '100',
    duration: '20',
    discount: '10'
  }
  const planCreate = await planModel.create(plan);
  console.log(planCreate);
})()
module.exports = planModel;