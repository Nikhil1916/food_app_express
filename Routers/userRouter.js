const express = require('express');
const userRouter = express.Router();
const { JWT_KEY } = require('../secrets');
const { getUser, updateUser, postUser, deleteUser, getAllUser
} = require('../controller/userController');
const { protectRoute } = require('../helper');
userRouter
  .route("/:id")
  .patch(updateUser)
  .delete(deleteUserById)

app.use(protectRoute)
userRouter
  .route('/userProfile')
  .get(getUser)

app.use(isAutharized(['admin']))
userRouter
  .route('')
  .get(getAllUsers)

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