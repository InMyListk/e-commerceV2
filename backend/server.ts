import express, { NextFunction, Request, Response } from "express";
import { data } from "./data";

const app = express();

app.get("/api/products", (req: Request, res: Response, next: NextFunction) => {
  res.send(data.products);
});

const port = process.env.port || 5000;

app.listen(port, () => {
  console.log(`serve on port ${port}`);
});
