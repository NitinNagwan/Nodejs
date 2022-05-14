require("dotenv").config();
const nodeMailer = require("nodemailer");
const Users = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const transporter = nodeMailer.createTransport({
  service: "hotmail",
  auth: {
    user: "fullst-world@outlook.com",
    pass: "Vi@no@ve@123",
  },
});

exports.register = async (req, res) => {
  const { Email, FirstName, Password } = req.body;

  Users.findOne({ email: Email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({ error: "user with email already exist" });
    }
    const token = jwt.sign(
      { Email, FirstName, Password },
      process.env.ACTIVATION_KEY,
      { expiresIn: "20m" }
    );
    const data = {
      from: "fullst-world@outlook.com",
      to: Email,
      subject: "Account activation",
      html: `
            <h2>Activate your account here</h2>
            <a href="http://localhost:3001/authenticate/${token}">http://localhost:3001/authenticate/${token}</a>
      `,
    };
    transporter.sendMail(data, (error, body) => {
      if (error) {
        return res.status(400).json({ error: "Failed to send the Email" });
      } else {
        return res.status(200).json({ message: "Mail send SuccessFully" });
      }
    });
  });
};

exports.activateUser = (req, res) => {
  const { token } = req.body;

  console.log(req.body);
  if (token) {
    jwt.verify(token, process.env.ACTIVATION_KEY, async (err, details) => {
      if (err) {
        return res.send(err);
      }
      const { FirstName, Email, Password } = details;

      const hassedPassword = await bcrypt.hash(Password, 10);

      const newUser = new Users({
        name: FirstName,
        email: Email,
        password: hassedPassword,
      });

      await newUser.save((err, success) => {
        if (err) {
          return res.status(400).send("User with this Email already Exsists");
        }
        return res.status(200).send("Registration Successfull");
      });
    });
  } else {
    return res.status(400).send("Invalid token or token not found.");
  }
};

exports.forgetPassword = (req, res) => {
  const { Email } = req.body;
  console.log(Email);

  Users.findOne({ email: Email }).exec((err, user) => {
    if (!user) {
      return res.status(400).json({ error: "user does not exist" });
    }
    const token = jwt.sign({ Email }, process.env.ACTIVATION_KEY, {
      expiresIn: "20m",
    });
    const data = {
      from: "fullst-world@outlook.com",
      to: Email,
      subject: "Reset Password",
      html: `
            <h2>click on the link below to reset your password</h2>
            <a href="http://localhost:3001/reset-password/${token}">http://localhost:3001/forgot-password/${token}</a>
      `,
    };
    transporter.sendMail(data, (error, body) => {
      if (error) {
        return res.status(400).json({ error: "Failed to send the Email" });
      } else {
        return res
          .status(200)
          .json({ message: "Mail send SuccessFully"});
      }
    });
  });
};

exports.resetPassword = async (req, res) => {
  const { token, newPassword, confirmPassword } = req.body;
  if (newPassword !== confirmPassword) {
    return res.status(400).send("Password don't match");
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  if (token) {
    jwt.verify(token, process.env.ACTIVATION_KEY, async (err, details) => {
      const { Email } = details;
      if (err) {
        return res.send(err);
      }
      const user = await Users.findOneAndUpdate(
        { email: Email },
        { password: hashedPassword },
        {
          new: true,
        }
      );

      return res.status(200).send("Password changed successfully");
    });
  } else {
    return res.status(400).send("Invalid token or token not found.");
  }
};
