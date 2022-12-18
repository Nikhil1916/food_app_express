const userModel = require('../models/userModel');
var jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../secrets');

// function getSignUpPage(req, res) {
//   console.log(__dirname);
//   res.sendFile('F:/FoodApp/public/index.html');
//   // res.sendFile('../public/index.html', { root: __dirname });
// }

module.exports.signup = async function (req, res) {
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

module.exports.login = async function (req, res) {
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

module.exports.forgetPassword = async function (req, res) {
  let { email } = req.body;
  try {
    const user = userModel.findOne({ email });
    if (user) {
      //reset token
      const resetToken = user.createResetToken();
      //create link
      //https://xyz.com/resetPassord/resetToken
      let resetLink = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;
      //send mail to user
      //nodemailer
    } else {
      res.json({
        msg: 'User not found'
      })
    }
  } catch (err) {
    res.status(500).json({
      err: err.msg
    })
  }
}

module.exports.resetPassword = async function (req, res) {
  try {
    let token = req.params.token;
    let { password, confirmPassword } = req.body;
    const user = await userModel.findOne({ resetToken: token });
    if (user) {
      //resetpasswordhandler will update password in db
      user.resetPasswordHandeler(password, confirmPassword);
      await user.save();
      res.json({
        msg: 'Password Changed Successfully'
      })
    } else {
      res.json({
        msg: 'User not found'
      })
    }
  } catch (err) {
    res.json({
      msg: err.message
    })
  }
}

module.exports.logout = async function (req, res) {
  res.cookie('login', ' ', { maxAge: 1 });
  res.json({
    msg: 'user logged out successfully'
  })
}