const express = require('express');
const userModel = require('../models/userModel');
const authRouter = express.Router();
var jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../secrets');
authRouter
  .route("/signup")
  .get(getSignUpPage)
  .post(postSignup)

authRouter
  .route("/login")
  .post(loginUser)


function getSignUpPage(req, res) {
  console.log(__dirname);
  res.sendFile('F:/FoodApp/public/index.html');
  // res.sendFile('../public/index.html', { root: __dirname });
}

async function postSignup(req, res) {
  try {
    let data = req.body;
    let user = await userModel.create(data);
    res.json({
      message: "user added",
      user
    })
  } catch (err) {
    res.json({
      msg: "error occured",
      err: err.message
    })
  }
}

// function middleware1(req, res, next) {
//   console.log(1);
//   next();
// }

// function middleware2(req, res, next) {
//   console.log(2);
// }

// userSchema.post("save", () => {
//   console.log("after");
// })

async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      //add becrypt as password is hashed,bcrypt-compare
      res.cookie('isLoggedIn', true)
      if (password == user.password) {
        let uid = user['_id'];
        var token = jwt.sign({ payload: uid }, JWT_KEY);
        res.cookie("login", token);
        res.send('user logged in')
      } else {
        res.send({ msg: 'Incorrect Password' })
      }
    } else {
      res.json({
        msg: 'user not found'
      })
    }
  } catch (err) {
    res.json({
      msg: err.message
    })
  }
}

module.exports = authRouter;