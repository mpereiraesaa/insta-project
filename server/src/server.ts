import * as dotenv from "dotenv";
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

/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), () => {
  console.log("App is running at http://localhost:%d", app.get("port"));
  console.log("Press CTRL-C to stop\n");
});

export default server;
