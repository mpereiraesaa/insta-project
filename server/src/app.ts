import * as dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import session from "express-session";

// Load ENV vars
dotenv.config();

const { SESSION_SECRET } = process.env;

const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({ secret: SESSION_SECRET }));

app.get("/find-hashtag", null);
app.get("/info", null);
app.post("/connect", null);

export default app;
