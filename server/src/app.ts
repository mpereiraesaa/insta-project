import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import Controller from "./controllers/controller";

const { SESSION_SECRET } = process.env;

const app = express();

// Express configuration
app.set("port", process.env.PORT || 8000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false }));

app.get("/api/find-hashtag", Controller.findHashtag);
app.get("/api/info", Controller.getInfo);
app.post("/api/connect", Controller.authorize);

export default app;
