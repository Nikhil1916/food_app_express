const userModel = require('../models/userModel');
module.exports.getUser = async function (req, res, next) {
  let id = req.params.id ?? req.id;
  try {
    let user = await userModel.findById(id);
    return res.json({
      msg: "user found",
      user,
    });
  } catch (err) {
    res.json({
      msg: err.message
    })
  }
}

module.exports.updateUser = async function (req, res) {
  let id = req.params.id;
  const dataToBeUpdated = req.body;
  try {
    let user = await userModel.findById(id);
    if (user) {
      const keys = [];
      for (let key in dataToBeUpdated) {
        keys.push(key);
      }
      for (let i = 0; i < keys.length; i++) {
        user[keys[i]] = dataToBeUpdated[keys[i]];
      }
      const updatedData = await user.save();
      return res.json({
        message: "Data updated",
        updatedData
      })
    } else {
      return res.json({
        msg: 'user not found'
      })
    }
  } catch (err) {
    res.json({
      msg: [err.message, 'update user failed']

    })
  }
}

// module.exports.postUser = function (req, res) {
//   //then i can put this in db 
//   let userObj = req.body;
//   res.json({
//     message: "Data received successfully",
//     user: req.body
//   });
// }

module.exports.deleteUser = async function (req, res) {
  let id = req.params.id;
  try {
    // let doc = await userModel.deleteOne(req.body);
    // let doc = await userModel.findOneAndRemove(req.body); //or delete one just diff in the value returned
    let user = await userModel.findByIdAndDelete(id); //for normal remove steps
    res.json({
      message: "user deleted",
      query: req.params.id,
      user
    });
  } catch (err) {
    res.json({
      err: err.message
    })
  }
}

// module.exports.getUserById = function (req, res, next) {
//   // console.log(req.params);
//   let userData = user.find((data) => data.id == req.params.id);
//   res.json({ message: "user id called", id: req.params, userData });
//   next();
// }

// module.exports.getCookies = function (req, res) {
//   let cookie = req.cookies;
//   res.send({ cookie });
// }

module.exports.deleteUsers = function (req, res) {
  user = {},
    res.json({
      message: "users deleted"
    });
}

// module.exports.setCookies = function (req, res) {
//   // res.setHeader('Set-Cookie', 'isLogged=true');
//   res.cookie('isLoggedIn', 'false', { maxAge: 10000, secure: true });
//   res.cookie('password', '123456789');
//   res.send('cookies has been send');
// }

module.exports.allUser = async function (req, res, next) {
  try {
    let users = await userModel.find();
    res.json({
      msg: "user list",
      users
    });
  } catch (err) {
    res.json({
      msg: err.message
    })
  }
}
