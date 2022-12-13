const express = require('express');
const authRouter = express.Router();
authRouter
  .route("/signup")
  .get(getSignUpPage)
  .post(postSignup)

authRouter
  .route("/login")
  .post(loginUser)


function getSignUpPage(req, res) {
  res.sendFile("./public/index.html", { root: __dirname });
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

}

module.exports = authRouter;