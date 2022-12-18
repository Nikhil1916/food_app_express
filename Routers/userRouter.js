const express = require('express');
const userRouter = express.Router();
const { JWT_KEY } = require('../secrets');
const { getUser, updateUser, postUser, deleteUser, allUser } = require('../controller/userController');
const { protectRoute, isAuthorised } = require('../helper');
const { signup, login, forgetPassword, logout, resetPassword } = require('../controller/authController');

userRouter
  .route("/login")
  .post(login)

userRouter
  .route("/signup")
  .post(signup)

userRouter
  .route("/logout")
  .post(logout)

userRouter
  .route('/forgetPasword')
  .post(forgetPassword)

userRouter
  .route('/resetPassword/:token')
  .post(resetPassword)

userRouter.use(protectRoute)
userRouter
  .route("/:id")
  .patch(updateUser)
  .delete(deleteUser)

userRouter
  .route('/Profile')
  .get(getUser)

userRouter.use(isAuthorised(['admin']))
userRouter
  .route('/')
  .get(allUser)

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