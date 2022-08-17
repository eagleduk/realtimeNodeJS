import express from "express";
import { join } from "path";
import Server from "socket.io";
import socketEvents from "./socketEvents";

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

io.on("connection", (socket) => socketEvents(socket));
