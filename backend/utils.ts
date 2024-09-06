import jwt from "jsonwebtoken";
import dontenv from "dotenv";

dontenv.config();

export const generateToken = (user: any): string => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};
