// const corsOptions = {
//   // origin: "http://localhost:8102", // "https://smileaday.org"
//   origin: "*",
//   methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
//   allowedHeaders: ["X-Requested-With", "Origin", "Content-Type", "Accept"],
// };
// app.use(cors(corsOptions));

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (req.method === "OPTIONS") {
    return res.send(200);
  } else {
    return next();
  }
});




// updates
// Certainly! Here is an improved version of the code snippet for handling CORS in an Express application. This version avoids redundancy and adheres to best practices for readability and maintainability:

const cors = require('cors');
const express = require('express');
const app = express();

// Use the CORS middleware
app.use(cors());

// Custom middleware to handle CORS headers and preflight requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  } else {
    next();
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Explanation of Improvements:

// Consolidate Headers:
// Removed the redundant setting of Access-Control-Allow-Headers. Combined them into a single line for clarity.

// Use sendStatus Method:
// Replaced res.send(200) with res.sendStatus(200) to make it more concise and clear.

// Organize Imports:
// Grouped the require statements at the top for better readability.

// Code Structure:
// Added comments for clarity and organization.
// Included a sample server setup (app.listen) to make the snippet functional.

// Best Practices:

// Modular Middleware:
// Consider using separate middleware modules for different aspects of request handling, keeping the main application file clean.

// Restrict Origins in Production:
// For security purposes, replace the wildcard '*' in Access-Control-Allow-Origin with specific origins in a production environment.

// Here is how you might restrict origins for a production environment:

const allowedOrigins = ['https://example.com', 'https://anotherexample.com'];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  } else {
    next();
  }
});
// This approach adds a level of security by allowing only specified origins to access your resources.





