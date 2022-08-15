import express from "express";
import { join } from "path";
import Server from "socket.io";

const PORT = 4400;
const app = express();

app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use("/static", express.static(join(__dirname, "static")));

app.get("/", (req, res) => res.render("home"));

const handleListening = () =>
  console.log(`Listening Server http://localhost:${PORT}`);

const server = app.listen(PORT, handleListening);

const io = Server(server);

io.on("connection", (socket) => {
  socket.on("sendMssage", (data) => {
    socket.broadcast.emit("receiveMessage", {
      ...data,
      nickname: socket.nickname || "Anonymous",
    });
  });
  socket.on("setNickname", (data) => {
    socket.nickname = data.nickname;
  });
});
