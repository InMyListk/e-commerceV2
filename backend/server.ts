import express, { NextFunction, Request, Response } from "express";
import { data } from "./data";

const app = express();

app.get("/api/products", (req: Request, res: Response, next: NextFunction) => {
  res.send(data.products);
});

app.get(
  "/api/product/slug/:slug",
  (req: Request, res: Response, next: NextFunction) => {
    const product = data.products.find((x) => x.slug === req.params.slug);

    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  }
);

const port = process.env.port || 5000;

app.listen(port, () => {
  console.log(`serve on port ${port}`);
});
