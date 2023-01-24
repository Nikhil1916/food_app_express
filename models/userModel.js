const mongoose = require('mongoose');
const { db_link } = require("../secrets");
const email_validator = require("email-validator");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcrypt');

mongoose.connect(db_link)
  .then((db) => {
    console.log("user db connected");
  })
  .catch((err) => {
    console.log(err);
  });

const userSchema = mongoose.Schema({
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
  resetToken: { type: String }
  // profileImage: {
  //   type: String,
  //   default: 'img.png'
  // } //will add this functionlity when map with front end as in demo website not able to see this
})

userSchema.pre("save", async function () {
  this.confirmPassword = undefined;
  // let salt = await bcrypt.genSalt();
  // let hashedString = await bcrypt.hash(this.password, salt);
  // this.password = hashedString;
})

userSchema.methods.createResetToken = async function () {
  const resetToken = uuidv4();
  this.resetToken = resetToken;
  // this.confirmPassword = this.password;// will do if confirm password is required field otherwise it will throw validation error 
  await this.save();
  return resetToken;
}

userSchema.methods.resetPasswordHandler = function (password, confirmPassword) {
  this.password = password;
  this.confirmPassword = password;
  this.resetToken = undefined;
}

//models
const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;