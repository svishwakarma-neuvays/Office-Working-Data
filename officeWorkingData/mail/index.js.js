const nodemailer = require("nodemailer");
const express = require("express");
require("dotenv").config();
const path = require("path");
const ejs = require("ejs");
// const fileUpload = require('express-fileUpload')

const app = express();

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.email",
  port: 587, //not needed
  secure: false, // Use `true` for port 465, `false` for all other ports    //not needed
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
});

// Define email content
const mailOptions = {
  from: {
    name: "ironX",
    address: process.env.USER,
  },
  to: ["svishwakarma@neuvays.com", "shashikant.888.v@gmail.com"],
  subject: "nodemailer testing!!",
  text: "Hello world?",
  html: "", //html body // empty when using ejs template
  attachments: [
    {
      filename: "image.jpg",
      path: path.join(__dirname, "image.jpg"),
      contentType: "image/jpg",
    },
  ],
};

const sendMail = async (transporter, mailOptions, templateParams) => {
  try {
    const emailHTML = await ejs.renderFile("email.ejs", templateParams);
    mailOptions.html = emailHTML;
    await transporter.sendMail(mailOptions);
    console.log("Email sent!!");
  } catch (error) {
    console.error(error);
  }
};
//working
app.get("/mail", async (req, res) => {
  const templateParams = { name: "SHASHI" };
  await sendMail(transporter, mailOptions, templateParams);
  res.send("hello world!!");
});


app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
