const mongoose = require("mongoose");
require('dotenv').config();

exports.connectDatabase = () => {
  const uri = process.env.MONGO_URI;
  mongoose
    .connect(uri)
    .then((con) => console.log(`Databse connected : ${con.connection.host}`))
    .catch((err) => console.log(err));
};
