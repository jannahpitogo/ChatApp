import express from "express";
import { WebSocketServer } from "ws";
import { createServer } from "http";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("public"));

const messages = [
  {
    message: "Hello, I am Jannah",
    user: "Jannah",
    time: "5/27/2025, 10:00:00 AM",
  },
];

const server = createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  ws.send(JSON.stringify(messages));

  ws.on("message", (data) => {
    const { message, user, time } = JSON.parse(data);
    messages.push({
      message,
      user,
      time,
    });
    wss.clients.forEach((client) => {
      client.send(JSON.stringify(messages));
    });
  });
});

// app.get("/messages", (req, res) => {
//   res.json(messages);
// });

// app.post("/newmessage", (req, res) => {
//   const { message, user, time } = req.body;

//   if (!message || !user || !time) {
//     res.status(400).send("Message or user is missing");
//     return res;
//   }

//   messages.push({
//     message,
//     user,
//     time,
//   });
//   res.send("ok");
// });

server.listen(port, () => {
  console.error(`server listening on port ${port}`);
});
