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
  if (!isEmpty(user) && user.username && user.avatar) {
    users.push(user);
    res.statusMessage = "Ok";
    res.status(201).send();
  } else {
    res.statusMessage = "Todos os campos são obrigatórios!";
    res.status(400).send();
  }
});

app.post("/tweets", (req, res) => {
  let tweet = req.body;
  if (!isEmpty(tweet) && tweet.username && tweet.tweet) {
    let user = users.find((user) => user.username === tweet.username);
    tweets.push({ ...tweet, avatar: user.avatar });
    res.statusMessage = "Ok";
    res.status(201).send();
  } else {
    res.statusMessage = "Todos os campos são obrigatórios!";
    res.status(400).send();
  }
});

app.get("/tweets", (req, res) => {
  //retornar array com os últimos 10 tweets
  res.status(200);
  res.send(tweets.slice(-10));
});

app.listen(5000);

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
