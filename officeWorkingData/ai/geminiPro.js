const dotenv = require("dotenv");
const fetch = require("node-fetch");
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// async function run() {
//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//     while (true) {
//       const prompt = await new Promise((resolve) => {
//         readline.question(
//           'Enter your prompt (or type "exit" to quit):---> ',
//           resolve
//           );
//         });

//         if (prompt.toLowerCase() === "exit") {
//         break;
//       }

//       const result = await model.generateContent(prompt);
//       const response = await result.response;
//       const text = response.text();
//       console.log(text);
//     }

//     readline.close();
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// run();

// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const prompt = "ignore the image and tell me if I make same api in nodejs and bun, which will be faster and why and give me the responce in Readme.md format";

  const imageParts = [
    fileToGenerativePart("image2.jpg", "image/jpeg"),
    // fileToGenerativePart("image1.png", "image/png"),
  ];

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();
