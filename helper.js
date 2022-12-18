
var jwt = require('jsonwebtoken');
const { JWT_KEY } = require('./secrets');
const userModel = require('./models/userModel');
// isAdmin cookie can be used to identify b / w user and admin as list will be seeen to ss admin only
module.exports.protectRoute = async function (req, res, next) {
  let token;
  if (req.cookies.login) {
    token = req.cookies.login;
    let payloadObj = jwt.verify(token, JWT_KEY);
    const user = await userModel.findById(payloadObj.payload);
    req.id = user.id;
    req.role = user.roles;
    if (user) {
      next();
    } else {
      res.json({
        msg: 'user not logged in.'
      })
    }
  } else {
    res.json({
      msg: 'Operation not allowed to user'
    })
  }
}

//isAutorised-? check the user's role
// client will send role key in req obj
module.exports.isAuthorised = function (roles) {
  return function (req, res, next) {
    let role = req.role;
    if (roles.includes(role)) {
      next();
    } else {
      res.status(401).json({
        msg: 'Invalid role'
      })
    }
  }
}