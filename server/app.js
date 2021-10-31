import express from "express";
import "express-async-errors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import tweetsRouter from "./router/tweets.js";
import authRouter from "./router/auth.js";
import { config } from "./config.js";
import { initSocket } from "./connection/socket.js";
import { db } from "./db/database.js";
import { csrfCheck } from "./middleware/csrf.js";

const app = express();
const corsOption = {
  origin: config.cors.allowedOrigin,
  optionsSuccessStatus: 200,
  credentials: true, // allow the Access-Control-Allow-Credentials
};
app.use(express.json());
app.use(cookieParser());
app.use(morgan("tiny"));
app.use(cors(corsOption));
app.use(helmet());

app.use(csrfCheck);
app.use("/tweets", tweetsRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  res.status(404);
});

app.use((error, req, res, next) => {
  res.status(500).json({ message: error });
});

db.getConnection().then(() => console.log("DB connected"));
console.log(`Server is started... ${new Date()}`);
const server = app.listen(config.port);
initSocket(server);
