const express = require('express');
const bookingRouter = express.Router();
const { protectRoute } = require('../helper');
const { createSession } = require('../controller/bookingController');
bookingRouter.use(express.static("public"));

bookingRouter.route('/createSession').get(function (req, res) {
  res.sendFile("F:/FoodApp/public/Booking.html");
});

// bookingRouter.use(protectRoute);
bookingRouter.route('/createSession').post(createSession);

module.exports = bookingRouter;