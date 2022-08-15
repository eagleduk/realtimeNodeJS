import express from "express";

const PORT = 4400;
const app = express();

const handleListening = () =>
  console.log(`Listening Server http://localhost:${PORT}`);
app.listen(PORT, handleListening);
