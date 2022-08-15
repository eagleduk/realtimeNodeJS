import express from "express";
import { join } from "path";

const PORT = 4400;
const app = express();

app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use("static", express.static(join(__dirname, "static")));

app.get("/", (req, res) => res.render("home"));

const handleListening = () =>
  console.log(`Listening Server http://localhost:${PORT}`);
app.listen(PORT, handleListening);
