// Import necessary modules
const express = require('express');
const router = express.Router();
const { YourModel } = require('../models'); // Import your Sequelize model

// Define route handler function
router.delete('/deleteAllData', async (req, res) => {
  try {
    // Use Sequelize's destroy method to delete all records from the specified table
    await YourModel.destroy({ truncate: true });

    // Send success response
    res.status(200).send({ message: 'All data deleted successfully.' });
  } catch (error) {
    // Handle errors
    console.error('Error deleting data:', error);
    res.status(500).send({ error: 'Failed to delete data. Please try again later.' });
  }
});

// Export router
module.exports = router;














// apiRoutes.delete("/deleteData", async function (req, res) {
//   try {
//     const deletedRows = await contact.destroy({
//       where: {
//         email: req.body.userEmail,
//       },
//     });
//     if (deletedRows === 0) {
//       return res.status(404).json({ error: "No data found" });
//     }
//     res.status(200).json({ message: "data deleted successfully", deletedRows });
//   } catch (error) {
//     console.error("Error deleting data:", error);
//     res.status(500).json({ error: "Failed to delete data" });
//   }
// });