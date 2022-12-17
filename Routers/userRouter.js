const express = require('express');
const userRouter = express.Router();
const { JWT_KEY } = require('../secrets');
const { getUser, updateUser, postUser, deleteUser, getAllUser } = require('../controller/userController');
const { protectRoute, isAuthorised } = require('../helper');
const { signup, login } = require('../controller/authController');

userRouter
  .route("/login")
  .post(login)

userRouter
  .route("/signup")
  .post(signup)

userRouter
  .route("/:id")
  .patch(updateUser)
  .delete(deleteUser)

userRouter.use(protectRoute)
userRouter
  .route('/userProfile')
  .get(getUser)

userRouter.use(isAuthorised(['admin']))
userRouter
  .route('')
  .get(getAllUser)

// userRouter
//   .route("/setCookies")
//   .get(setCookies)


// userRouter
//   .route("/getCookies")
//   .get(getCookies)


//middleware in old way
// app.get("/user/:id", middleware1, (req, res, next) => {
//   next();
// }, middleware2)
module.exports = userRouter;