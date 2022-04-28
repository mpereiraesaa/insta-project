import * as dotenv from "dotenv";
import https from "https";
import fs from "fs";
import errorHandler from "errorhandler";
import app from "./app";

// Load ENV vars
dotenv.config();

/**
 * Error Handler. Provides full stack
 */
if (process.env.NODE_ENV === "development") {
  app.use(errorHandler());
}

const options = {
  key: fs.readFileSync('../certs/server.key'), // Replace with the path to your key
  cert: fs.readFileSync('../certs/server.cert') // Replace with the path to your certificate
}

/**
 * Start Express server.
 */
const server = https.createServer(options, app).listen(app.get("port"), () => {
  console.log("Backend is running at https://localhost:%d", app.get("port"));
  console.log("Frontend is loading...")
});

export default server;
