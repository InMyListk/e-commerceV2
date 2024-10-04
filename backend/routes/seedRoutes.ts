import { data } from "../data";
import Product from "../models/productModel";
import express, { Request, Response } from "express";
import User from "../models/userModel";

export const seedRouter = express.Router();

seedRouter.get("/", async (req: Request, res: Response) => {
  await Product.deleteMany();
  const createdProducts = await Product.insertMany(data.products);
  await User.deleteMany();
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdProducts, createdUsers });
});

export default seedRouter;
