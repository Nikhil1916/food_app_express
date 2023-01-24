let SK = "sk_test_51MMmJmSE0D9IClxDVLDf8OR2N91MD8GlOuqimIhvMA0PViEia3RbIM7CtMn15JGHsvA8oUCVohpJ7KvMCNx001La00civkmExc";
const stripe = require('stripe')(SK);
const planModel = require('../models/planModel');
const userModel = require('../models/userModel');
module.exports.createSession = async function (req, res) {
  try {
    // const userId = req.id;
    // const planId = req.params.id;
    // const user = await userModel.findById(userId);
    // const plan = await planModel.findById(planId);
    const product = await stripe.products.create({
      name: 'T-shirt',
      description: 'Comfortable cotton t-shirt',
      images: ['https://example.com/t-shirt.png'],
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: 2000,
      currency: 'usd',
    });

    const session = await stripe.checkout.sessions.create({
      // payment_method_types: ['card'],
      // customer_email: user.email,
      // client_reference_id: plan.id,
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          // name: "health plan", //plan.name
          // // description: plan.description,
          // // price: 700,
          // // quantity: 1,
          // amount: 1234, //plan.price * 100,
          // // currency: 'inr',
          // quantity: 1,
          price: price.id,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.protocol}://${req.get("host")}/profile`,
      cancel_url: `${req.protocol}://${req.get("host")}/profile`,
    });
    res.redirect(303, session.url);
  } catch (err) {
    console.log(err.message);
    res.json({
      err: err.message
    })
  }
}
