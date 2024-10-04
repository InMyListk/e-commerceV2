import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { Router } from "express";
import Order from "../models/orderModel";
import { isAuth } from "../utils";

const orderRouter = Router();

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const newOrder = new Order({
      orderitems: req.body.orderitems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      totalPrice: req.body.totalPrice,
      taxPrice: req.body.taxPrice,
      user: req.user._id,
    });

    const order = await newOrder.save();
    res.status(200).send({ message: "New order created", order });
  })
);

export default orderRouter;
