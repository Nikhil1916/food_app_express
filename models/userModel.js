const moongoose = require('mongoose');
const { db_link } = require("../secrets");
const email_validator = require("email-validator");
const uuidv4 = require("uuid");
const bcrypt = require('bcrypt');

moongoose.connect(db_link)
  .then((db) => {
    console.log("user db connected");
  })
  .catch((err) => {
    console.log(err);
  });

const userSchema = moongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function () {
      return email_validator.validate(this.email)
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 7
  },
  confirmPassword: {
    type: String,
    required: true,
    minLength: 7,
    validate: function () {
      return this.password == this.confirmPassword;
    }
  },
  roles: {
    type: String,
    enum: ['admin', 'user', 'restaurantowner'],
    default: 'user'
  },
  resetToken: String
  // profileImage: {
  //   type: String,
  //   default: 'img.png'
  // }
})

userSchema.pre("save", async function () {
  this.confirmPassword = undefined;
  // let salt = await bcrypt.genSalt();
  // let hashedString = await bcrypt.hash(this.password, salt);
  // this.password = hashedString;
})

userSchema.methods.createResetToken = function () {
  const resetToken = uuidv4();
  this.resetToken = resetToken;
  return resetToken;
}

userSchema.methods.resetPasswordHandler = function (password, confirmPassword) {
  this.password = password;
  this.confirmPassword = password;
  this.resetToken = undefined;
}

//models
const userModel = moongoose.model("userModel", userSchema);
module.exports = userModel;