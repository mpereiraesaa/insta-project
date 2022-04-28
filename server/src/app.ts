import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import Controller from "./controllers/controller";

const { SESSION_SECRET } = process.env;

const app = express();

// Express configuration
app.set("port", process.env.PORT || 8000);
app.use(cors({
  credentials: true,
  origin: ['https://localhost:3000', 'http://localhost:3000'],
  methods: ["GET,PUT,POST,DELETE,PATCH,OPTIONS"],
  allowedHeaders: `Content-Type, Authorization, X-Requested-With`,
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    sameSite: 'none'
  }
}));

app.get("/api/find-hashtag", Controller.findHashtag);
app.get("/api/info", Controller.getInfo);
app.post("/api/connect", Controller.authorize);

export default app;
