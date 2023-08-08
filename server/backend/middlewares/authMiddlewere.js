import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { User } from "../model/userModel.js";

const protectRoute = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decode.userId);
      next();
    } catch (err) {
      res.status(401).json({
        success: false,
        message: "Not Recognized, not valid token",
      });
    }
  } else {
    res.status(401).json({
      success: false,
      message: "Not Authorized, Please login first!!",
    });
  }
});

export { protectRoute };
