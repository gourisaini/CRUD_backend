import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";

import { connectDatabase } from "./models/db.js";
import userRoutes from "./routes/userRoute.js";
import todoRoutes from "./routes/todoRoute.js";
import ErrorHandler from "./utils/ErrorHandler.js";
import { generatedErrors } from "./middleware/error.js";

const app = express();

connectDatabase();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);

app.use(cookieParser());

app.use("/", userRoutes, todoRoutes);

app.all("*", (req, res, next) => {
  next(new ErrorHandler(`Requested URL not found ${req.url}`, 404));
});
app.use(generatedErrors);

app.listen(process.env.PORT, () => {
  console.log("connected to server 8080");
});
