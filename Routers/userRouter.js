const express = require('express');
const userRouter = express.Router();
const userModel = require("../models/userModel");

userRouter
  .route("/")
  .get(getUsers)
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
  // .get(middleware1, getUserById, middleware2)
  .get(getUserById)
  .patch(updateUser)
  .delete(deleteUserById)

//middleware in old way
// app.get("/user/:id", middleware1, (req, res, next) => {
//   next();
// }, middleware2)

async function getUsers(req, res, next) {
  let users = await userModel.find();
  res.json({
    msg: "user list",
    users
  });
}

async function updateUser(req, res) {
  const dataToBeUpdated = req.body;
  let doc = await userModel.findOneAndUpdate({ email: 'nikhil9013@gmail.com' }, dataToBeUpdated)
  res.json({
    message: "Data updated"
  })
}


function addUser(req, res) {
  //then i can put this in db 
  let userObj = req.body;
  let addUser = {};
  for (const key in userObj) {
    addUser[key] = userObj[key]
  }
  addUser['id'] = user.length + 1;
  user.push(addUser);
  res.json({
    message: "Data received successfully",
    user: req.body
  });
}

async function deleteUserById(req, res) {
  // user.splice(req.params.name, 1),
  // console.log(this, " this");
  try {
    // let doc = await userModel.deleteOne(req.body);
    // let doc = await userModel.findOneAndRemove(req.body); //or delete one just diff in the value returned
    // console.log(doc, "user delete fn");
    let user = await userModel.findOne(req.body); //for normal remove steps
    // console.log(user);
    let del = await user.remove();
    // console.log(del);
    res.json({
      message: "user deleted",
      query: req.params.id
    });
  } catch (err) {
    res.json({
      err: err.message
    })
  }
}

function getUserById(req, res, next) {
  // console.log(req.params);
  let userData = user.find((data) => data.id == req.params.id);
  res.json({ message: "user id called", id: req.params, userData });
  next();
}

function getCookies(req, res) {
  let cookie = req.cookies;
  console.log(cookie);
  res.send({ cookie });
}

function deleteUsers(req, res) {
  user = {},
    res.json({
      message: "users deleted"
    });
}

function setCookies(req, res) {
  // res.setHeader('Set-Cookie', 'isLogged=true');
  res.cookie('isLoggedIn', 'false', { maxAge: 10000, secure: true });
  res.cookie('password', '123456789');
  res.send('cookies has been send');
}
module.exports = userRouter;