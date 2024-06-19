exports.getAllRazorpay = async (req, res) => {
    try {
      const allPayments = await RazorpayDB.findAll({
        order: [["createdAt", "DESC"]],
      });
  
      // Convert JSON data to a worksheet
      const data = allPayments.map((payment) => payment.toJSON());
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "All Payments");
  
      // Write workbook to a buffer
      const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
  
      // Set response headers for the Excel file
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=all_payments.xlsx"
      );
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      console.log("Buffer Length:", buffer.length);
  
      // Send the buffer as response
      res.send(buffer);
  
      // Send the buffer as response
      // console.log(buffer);
      // const fs = require("fs");
      // fs.writeFileSync("test.xlsx", buffer);
      // res.send(buffer);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  };