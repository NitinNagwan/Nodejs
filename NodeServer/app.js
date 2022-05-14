const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const multer = require('multer')
const cors = require("cors");
const bodyParser = require("body-parser");
const url = "mongodb://localhost:27017/usersdb";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const con = mongoose.connection;

con.once("open", () => {
  console.log("connected...");
});

const alienRouter = require("../NodeServer/routes/users");
app.use("/users", alienRouter);

const questions = require("../NodeServer/routes/questionsRoutes");
app.use("/api/quiz/questions", questions);

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});
const upload = multer({ storage: fileStorageEngine });

app.post("/single", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.send("upload sussfully");
});

const server = http.createServer(app);

server.listen(8000);
