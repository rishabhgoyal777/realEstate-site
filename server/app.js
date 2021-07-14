const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGORUI, MONGOURI } = require("./keys");

const PORT = 5000;

mongoose.connect(MONGOURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongodb database");
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

require("./models/user");
require("./models/post");

app.use(express.json());
app.use(require("./routes/post"));
app.use(require("./routes/auth"));

app.get("/", (req, res) => {
  res.send("heloo world");
});

app.listen(PORT, () => {
  console.log(`server running on Port ${PORT}`);
});
