import express from "express";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("public"));

const messages = [
  {
    message: "Hello, I am Jannah",
    user: "Jannah",
  },
];

app.get("/messages", (req, res) => {
  res.json(messages);
});

app.post("/newmessage", (req, res) => {
  const { message, user } = req.body;

  if (!message || !user) {
    res.status(400).send("Message or user is missing");
    return res;
  }

  messages.push({
    message,
    user,
  });
  res.send("ok");
});

app.listen(port, () => {
  console.error(`server listening on port ${port}`);
});
