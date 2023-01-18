// "use strict";
const nodemailer = require("nodemailer");
const { pass } = require("./../secrets");

// async..await is not allowed in global scope, must use a wrapper
module.exports.sendMail = async function sendMail(str, data) {
  // create reusable transporter object using the default SMTP transport
  console.log(pass);
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "foodapp1908@gmail.com", // generated ethereal user
      pass: pass // generated ethereal password
    },
  });
  let esub, eHtml, eText;
  if (str == "signup") {
    esub = `Thank you for signing ${data.name}`;
    eHtml = `<h1>Welcome to foodApp.com</h1>
    Hope You have a great experience
    Name - ${data.name}
    Email - ${data.email}`;
    eText = "Hope u enjoy your journey with us."
  } else {
    esub = `Reset Password`;
    eHtml = `<h1>foodApp.com</h1>
    Here is your link to reset password : ${data.resetPasswordLink}`
    eText = "Hope u enjoy your journey with us."
  }

  // send mail with defined transport object
  console.log(data.email);
  let info = await transporter.sendMail({
    from: '"FoodApp🥗" <nikhilchawla9013@gmail.com>', // sender address
    to: data.email,  // list of receivers
    subject: esub, // Subject line
    text: eText, // plain text body
    html: eHtml, // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

// sendMail().catch(console.error);
