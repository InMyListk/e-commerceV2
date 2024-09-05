import express, { NextFunction, Request, Response } from "express";
import { data } from "./data";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { productRouter } from "./routes/productRoutes";
import { seedRouter } from "./routes/seedRoutes";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL!)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use("/api/seed", seedRouter);
app.use("/api/products", productRouter);

const port = process.env.port || 5000;

app.listen(port, () => {
  console.log(`serve on port ${port}`);
});
