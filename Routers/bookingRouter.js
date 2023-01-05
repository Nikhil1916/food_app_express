const express = require('express');
const bookingRouter = express.Router();
const { protectRoute } = require('../helper');
const { createSession } = require('../controller/bookingController');

bookingRouter.route('/createSession').get(function (req, res) {
  res.sendFile("F:/FoodApp/Booking.html");
});

bookingRouter.use(protectRoute);
bookingRouter.route('/createSession/:id').post(createSession);

module.exports = bookingRouter;