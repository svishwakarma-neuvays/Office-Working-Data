const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./your-sequelize-setup'); // Import Sequelize and set up your connection

const app = express();
app.use(bodyParser.json());

// Define your API route
app.get('/fetchTopManager/:employeeId', async (req, res) => {
  try {
    const { employeeId } = req.params;
    
    const rawQuery = `
      SELECT COALESCE(L5ManagerId, L4ManagerId, L3ManagerId, L2ManagerId) AS TOPManager
      FROM empmangs
      WHERE employeeId = :employeeId`;

    const result = await sequelize.query(rawQuery, {
      replacements: { employeeId },
      type: sequelize.QueryTypes.SELECT
    });

    // Extract TOPManager value from the result
    const TOPManager = result.length > 0 ? result[0].TOPManager : null;

    console.log("TOPManager:", TOPManager); // Print TOPManager value

    res.json({ TOPManager }).status(200);
  } catch (error) {
    console.error("Error fetching TOPManager:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start your server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
