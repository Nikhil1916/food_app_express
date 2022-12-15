const express = require('express');
const userRouter = express.Router();
const userModel = require("../models/userModel");
var jwt = require('jsonwebtoken');
const JWT_KEY = require('../secrets');
const { getUsers, updateUser, addUser, deleteUserById, getUserById, getCookies, setCookies,
  deleteUsers
} = require('../controller/userController');
const { protectRoute } = require('../helper');
userRouter
  .route("/")
  .get(protectRoute, getUsers)
  .post(addUser)
  .delete(deleteUsers)

userRouter
  .route("/setCookies")
  .get(setCookies)


userRouter
  .route("/getCookies")
  .get(getCookies)


userRouter
  .route("/:id")
  .get(getUserById)
  .patch(updateUser)
  .delete(deleteUserById)

//middleware in old way
// app.get("/user/:id", middleware1, (req, res, next) => {
//   next();
// }, middleware2)
module.exports = userRouter;