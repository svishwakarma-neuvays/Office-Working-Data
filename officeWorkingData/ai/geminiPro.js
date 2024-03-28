const dotenv = require("dotenv");
const fetch = require("node-fetch");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    while (true) {
      // Loop to keep prompting for input
      const prompt = await new Promise((resolve) => {
        readline.question(
          '-----Enter your prompt (or type "exit" to quit):---> ',
          resolve
        );
      });

      if (prompt.toLowerCase() === "exit") {
        break; // Exit the loop if the user types "exit"
      }

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      console.log(text);
    }

    readline.close(); // Close the readline interface after exiting the loop
  } catch (error) {
    console.error("Error:", error);
  }
}

run();
