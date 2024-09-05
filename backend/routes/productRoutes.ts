import { data } from "../data";
import Product from "../models/productModel";
import express, { NextFunction, Request, Response } from "express";

export const productRouter = express.Router();

productRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await Product.find();
    res.send(products);
  }
);

productRouter.get(
  "/slug/:slug",
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findOne({ slug: req.params.slug });

    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  }
);

productRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  }
);
