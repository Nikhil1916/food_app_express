const express = require('express');
const app = express();
var cookieParser = require('cookie-parser')

app.use(express.json());
app.use(cookieParser());

const userRouter = require('./Routers/userRouter');
const authRouter = require('./Routers/authRouter');

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/", (req, res) => {
  res.status(400).json({
    message: 'page not found'
  })
})

app.listen(5000);