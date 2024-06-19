const app = require("./app");
const { dbConnection } = require("./config/db.config");

const PORT = process.env.PORT || 3000;

dbConnection()

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
