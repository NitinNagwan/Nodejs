require("dotenv").config();
const http = require("http");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const { use } = require("bcrypt/promises");
const Users = require("./models/users");
const router = express.Router();
const validator = require("validator");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const refreshTokens = [];

// app.post("/user/login", async (req, res) => {
//   const user = users.find((user) => user.name === req.body.name);
//   if (!user) return req.status(400).send("Not Found");

//   try {
//     if (await bcrypt.compare(req.body.password, user.password)) {
//       const token = jwt.sign(user.name, process.env.ACCESS_TOKEN_SECRET);

//       res.status(201).send({ token: token });
//       // if (token) return res.send(token);
//     } else {
//       res.send("Not Allowed");ref
//     }
//   } catch {
//     res.status(500).send();
//   }
// });

app.post("/token", (req, res) => {
  const header = req.headers["authorization"];
  const refreshToken = header && header.split(" ")[1];
  // const refreshToken = req.body.token
  if (refreshToken === null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_ACCESS_TOKEN, (err, user) => {
    console.log(user);
    if (err) return res.sendStatus(403);
    const accessToken = generateToken(user);

    res.json({ accessToken: accessToken });
  });
});

app.post("/user/login", (req, res) => {
  const user = req.body.Email;
  console.log(user);
  const accessToken = generateToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_ACCESS_TOKEN);
  refreshTokens.push(refreshToken);

  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

function generateToken(user) {

  return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30s",
  });
}

// router.post("/login", async (req, res) => {
//   try {
//     const users = await Users.find();
//     users.forEach((user) => {
//       if (
//         validator.equals(user.email, req.body.email) ||
//         bcrypt.compare(req.body.password, user.password, (err, result) => {
//           if (err) throw new Error(err.message);
//           return result;
//         })
//       ) {
//         const accessToken = generateToken(user.email);
//         const refreshToken = jwt.sign(
//           user.email,
//           process.env.REFRESH_ACCESS_TOKEN
//         );
//         refreshTokens.push(refreshToken);

//         res.json({ accessToken: accessToken, refreshToken: refreshToken });
//       }
//     });
//   } catch (err) {
//     console.log(err.message);
//   }
//   // const user = req.body.Email;
//   // console.log(user);
// });

function generateToken(user) {
  return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30s",
  });
}

const server = http.createServer(app);

server.listen(4000);
