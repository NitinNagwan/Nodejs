require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const bcrypt = require("bcrypt");
const validator = require("validator");
const {
  register,
  activateUser,
  forgetPassword,
  resetPassword,
} = require("../controller/auth");

router.get("/", async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).send(users);
  } catch (err) {
    res.send("Error " + err);
  }
});

router.post("/signup", register);
router.post("/forgot-password", forgetPassword);
router.put("/reset-password", resetPassword);
router.post("/activateUser", activateUser);

router.get("/:id", async (req, res) => {
  try {
    const alien = await Users.findById(req.params.id);
    res.json(alien);
  } catch (err) {
    res.send("Error " + err);
  }
});

router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.Password, 10);

    const newUser = new Users({
      name: req.body.FirstName,
      email: req.body.Email,
      password: hashedPassword,
    });

    const a1 = await newUser.save();
    res.status(201).json(a1);
  } catch (err) {
    res
      .status(403)
      .send(
        err.errors?.email.message
          ? err.errors.email.message
          : "Email already Exsist"
      );
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const alien = await Users.findById(req.params.id);
    alien.sub = req.body.sub;
    const a1 = await alien.save();
    res.json(a1);
  } catch (err) {
    res.send("Error");
  }
});

router.post("/login", async (req, res) => {
  try {
    const users = await Users.find();
    const user = users.find((user) => user.email === req.body.Email);
    if (user) {
      if (!user.admin) {
        bcrypt.compare(req.body.Password, user.password, (err, result) => {
          if (result) {
            const accessToken = generateToken(user.email, user.admin);
            res.status(200).json({
              accessToken: accessToken,
              message: "Success",
              user: user.email,
              admin: user.admin,
            });
          } else {
            res.status(401).send("Wrong Password");
          }
        });
      } else {
        bcrypt.compare(req.body.Password, user.password, (err, result) => {
          if (result) {
            const accessToken = generateToken(user.email, user.admin);
            res.status(200).json({
              accessToken: accessToken,
              message: "Success",
              user: user.name,
              admin: user.admin,
            });
          } else {
            res.status(401).send("Wrong Password");
          }
        });
      }
    } else {
      res.status(400).send("Not a user");
    }
  } catch (err) {
    res.send(err.message);
  }
});

function generateToken(user, admin) {
  return jwt.sign({ user, admin }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "20m",
  });
}

router.post("/verify", async (req, res) => {
  const { token } = req.body;
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send(false);
    else return res.status(200).send({ admin: user.admin, user: user.user });
  });
});

module.exports = router;
