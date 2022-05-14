const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const hostname = "localhost";
const port = 3000;

const userData = [
  {
    id: 1,
    name: "nitin",
  },
];

app.get("/data", (req, res) => {
  res.send({ userData });
});

app.post("/data", (req, res) => {
  const data = req.body;
  userData.push(data);
  res.send({ userData });
});

app.put("/data/:id", (req, res) => {
  const data = req.body;

  const id = req.params.id;

  userData[id - 1] = data;

  res.send({ userData });
});

app.get("/data/:id", (req, res) => {
  const id = req.params.id;
  const data = userData[id - 1];
  res.send({ data });
});
const server = http.createServer(app);

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello World');
//   });

server.listen(port, hostname, () => {
  console.log("Server Running");
});
