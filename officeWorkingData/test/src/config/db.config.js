const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((con) => {
      console.log(`database connected => ${con.connection.host}`);
    })
    .catch((err) => {
      console.log(`error in database connection => ${err}`);
    });
};
