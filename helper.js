
var jwt = require('jsonwebtoken');
const { JWT_KEY } = require('./secrets');
// isAdmin cookie can be used to identify b / w user and admin as list will be seeen to ss admin only
module.exports.protectRoute = function (req, res, next) {
  if (req.cookies.login) {
    let token = req.cookies.login;
    let isVerified = jwt.verify(token, JWT_KEY);
    if (isVerified) {
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
