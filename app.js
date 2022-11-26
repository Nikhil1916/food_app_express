const express = require('express');
const app = express();
const moongoose = require('mongoose');
const { db_link } = require("./secrets")
app.use(express.json());

let user = [
  {
    id: 1,
    name: 'abhishek',
    age: 40
  },
  {
    id: 2,
    name: 'shyam',
    age: 30
  },
  {
    id: 3,
    name: 'nikhil',
    age: 20
  }
];

const useRouter = express.Router();
const authRouter = express.Router();
app.use("/users", useRouter);
app.use("/auth", authRouter);


useRouter
  .route("/")
  .get(getUsers)
  .post(addUser)
  .delete(deleteUsers)

useRouter
  .route("/:id")
  // .get(middleware1, getUserById, middleware2)
  .get(getUserById)
  .patch(updateUser)
  .delete(deleteUserById)

authRouter
  .route("/signup")
  .get(getSignUpPage)
  .post(postSignup)

//middleware in old way
// app.get("/user/:id", middleware1, (req, res, next) => {
//   next();
// }, middleware2)

async function getUsers(req, res, next) {
  // console.log(req.query);
  // let { name, age } = req.query;
  // let filteredUsers = [...users];
  // le
  // if (typeof name == 'string' && name.length > 0) {
  //   filteredUsers = user.filter((user) => user.name.toLocaleLowerCase() == name.toLocaleLowerCase());
  // }

  // if (!!age && !isNaN(age) && Number(age) >= 0) {
  //   filteredUsers = filteredUsers.filter((user) => user.age >= age); // use single & operater 
  // }
  // res.send(filteredUsers);
  // next();
  let users = await userModel.find();
  res.json({
    msg: "user list",
    users
  });
}

function updateUser(req, res) {
  let dataToBeStored = req.body;
  const id = req.params.id;
  let index = null;
  user.forEach((user, i) => {
    if (user.id == id) {
      index = i
    }
  });
  const userObj = user[index];
  for (const key in dataToBeStored) {
    userObj[key] = dataToBeStored[key];
  }
  user[index] = userObj;
  res.json({
    message: "Data updated"
  })
}

function addUser(req, res) {
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

function deleteUsers(req, res) {
  user = {},
    res.json({
      message: "user deleted"
    });
}

function deleteUserById(req, res) {
  console.log(req.params);
  user.splice(req.params.name, 1),
    res.json({
      message: "user deleted"
    });
}

function getUserById(req, res, next) {
  console.log(req.params);
  let userData = user.find((data) => data.id == req.params.id);
  res.json({ message: "user id called", id: req.params, userData });
  next();
}

function getSignUpPage(req, res) {
  res.sendFile("./public/index.html", { root: __dirname });
}

async function postSignup(req, res) {
  let data = req.body;
  let user = await userModel.create(data);
  res.json({
    message: "user added",
    user
  })
}

app.use("/", (req, res) => {
  //if user not signed vali condition add krni..
  res.redirect("/auth/signup");
})

// function middleware1(req, res, next) {
//   console.log(1);
//   next();
// }
// function middleware2(req, res, next) {
//   console.log(2);
// }

moongoose.connect(db_link)
  .then((db) => {
    console.log("db connected");
    // console.log(db);
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
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 7
  },
  confirmPassword: {
    type: String,
    required: true,
    minLength: 7
  },
})

//models
const userModel = moongoose.model("userModel", userSchema);
// (async function createUser() {
//   let user = {
//     name: 'nikhil chawla',
//     email: 'nikhil@gmail.com',
//     password: 'abcdefg',
//     confirmPassword: 'abcdefg'
//   };
//   let data = await userModel.create(user);
//   console.log(data);
// })()
app.listen(5000);