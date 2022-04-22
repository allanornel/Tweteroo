import express from "express";
import cors from "cors";

const app = express(); // cria um servidor
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cors());

let users = [];
let tweets = [];

app.post("/sign-up", (req, res) => {
  let user = req.body;
  users.push(user);
  console.log("OK");
  res.send("OK");
});

app.post("/tweets", (req, res) => {
  let tweet = req.body;
  let user = users.find((user) => user.username === tweet.username);
  tweets.push({ ...tweet, avatar: user.avatar });
  console.log("OK");
  res.send("OK");
});

app.get("/tweets", (req, res) => {
  //retornar array com os últimos 10 tweets
  res.send(tweets.slice(-10));
});

app.listen(5000);
