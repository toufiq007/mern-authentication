import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import { globalErrorHandler, notFound } from "./middlewares/errorMiddlewere.js";
dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT || 3000;

// using middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// using routes
app.use("/api/users", userRouter);

// globalErrorHandler
app.use(notFound);
app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server is running ${port}`);
});
