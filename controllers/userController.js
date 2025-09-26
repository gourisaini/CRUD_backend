import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import User from "../models/userModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { sendtoken } from "../utils/SendToken.js";

export const homepage = catchAsyncErrors(async (req, res, next) => {
  res.json({ message: "Secure homepage" });
});

export const currentUserInfo = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.id).select("-password");
  res.status(200).json({ user });
});

export const usersignup = catchAsyncErrors(async (req, res, next) => {
  const user = await new User(req.body).save();
  sendtoken(user, 200, res);
});

export const usersignin = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })
    .select("+password")
    .exec();
  if (!user) return next(new ErrorHandler("User Not Found", 404));
  const isMatch = user.comparepassword(req.body.password);
  if (!isMatch) return next(new ErrorHandler("Wrong Credientials", 500));
  sendtoken(user, 200, res);
});

export const usersignout = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("token");
  res.json({ message: "Sucessfully SignOut!" });
});
