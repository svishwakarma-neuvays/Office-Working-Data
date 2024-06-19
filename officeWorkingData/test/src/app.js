const express = require("express");
const morgan = require("morgan");

//importing routes
const user = require("./routes/user");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "server is running !!",
  });
});

//using routes
app.use("/api/v1", user);

module.exports = app;
