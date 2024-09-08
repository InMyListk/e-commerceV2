import express, { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils";

export const userRouter = express.Router();

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req: Request, res: Response) => {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
      }
    } else {
      res.status(401).send({ message: "Invalid email or password" });
    }
  })
);

userRouter.post(
  "/signup",
  expressAsyncHandler(async (req: Request, res: Response) => {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });

    const user = await newUser.save();

    res.send({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })
);
