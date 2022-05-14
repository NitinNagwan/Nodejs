require("dotenv").config();
const http = require("http");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser= require('body-parser')
const cors = require('cors')


const app = express();
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

const users = [];
app.get("/data", authenticate, (req, res) => {
  res.json(
    users.filter((user) => {
      if (user.email === req.user) return user;
    })
  );
});

// router.get("/", (req, res) => {
//   try{
//     const users = await Users.find()
//     res.json(users)
// }catch(err){
//  res.send('Error ' + err)
// }
// });

app.post("/user", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.Password, salt);
    const user = { name: req.body.FirstName,email: req.body.Email, password: hashedPassword };
    users.push(user);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

function authenticate(req, res, next) {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];
  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(user.user,"user")
    if (err) return res.sendStatus(403);
    req.user = user.user;
    next();
  });
}

const server = http.createServer(app);

server.listen(3003);

