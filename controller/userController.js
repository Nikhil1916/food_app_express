const userModel = require('../models/userModel');
module.exports.getUsers = async function (req, res, next) {
  let users = await userModel.find();
  res.json({
    msg: "user list",
    users
  });
}

module.exports.updateUser = async function (req, res) {
  const dataToBeUpdated = req.body;
  let doc = await userModel.findOneAndUpdate({ email: 'nikhil9013@gmail.com' }, dataToBeUpdated)
  res.json({
    message: "Data updated"
  })
}


module.exports.addUser = function (req, res) {
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

module.exports.deleteUserById = async function (req, res) {
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

module.exports.getUserById = function (req, res, next) {
  // console.log(req.params);
  let userData = user.find((data) => data.id == req.params.id);
  res.json({ message: "user id called", id: req.params, userData });
  next();
}

module.exports.getCookies = function (req, res) {
  let cookie = req.cookies;
  console.log(cookie);
  res.send({ cookie });
}

module.exports.deleteUsers = function (req, res) {
  user = {},
    res.json({
      message: "users deleted"
    });
}

module.exports.setCookies = function (req, res) {
  // res.setHeader('Set-Cookie', 'isLogged=true');
  res.cookie('isLoggedIn', 'false', { maxAge: 10000, secure: true });
  res.cookie('password', '123456789');
  res.send('cookies has been send');
}
