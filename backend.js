import express from "express";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("public"));

let messageIndex = 0;
const messages = [
  {
    message: "Hello, I am Jannah",
    user: "Jannah",
  },
];

app.get("/message", (req, res) => {
  res.send(`${messages[messageIndex].user}: ${messages[messageIndex].message}`);
});

app.post("/newmessage", (req, res) => {
  const body = req.body;

  if (typeof body != "object" || !("message" in body) || !("user" in body)) {
    res
      .status(400)
      .send("Expected body to be a JSON object containing keys message");
    return res;
  }

  messageIndex++;
  messages.push({
    message: body.message,
    user: body.user,
  });
  res.send("ok");
});

app.listen(port, () => {
  console.error(`server listening on port ${port}`);
});
