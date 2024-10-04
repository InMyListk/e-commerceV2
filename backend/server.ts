import express, { Errback, NextFunction, Request, Response } from "express";
import { data } from "./data";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { productRouter } from "./routes/productRoutes";
import seedRouter from "./routes/seedRoutes";
import userRouter from "./routes/userRoutes";
import orderRouter from "./routes/orderRouter";

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/seed", seedRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders");

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.port || 5000;

app.listen(port, () => {
  console.log(`serve on port ${port}`);
});
