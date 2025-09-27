import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "none",
    },
  })
);

app.use(cookieParser());

app.use("/", userRoutes, todoRoutes);

app.all("*", (req, res, next) => {
  next(new ErrorHandler(`Requested URL not found ${req.url}`, 404));
});

app.use(generatedErrors);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
