import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      defaultL: "",
    },
    contact: {
      type: String,
      required: [true, "Contact is required"],
      maxLength: [10, "Contact should be atleast 10 character long"],
      defaultL: "",
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is Required"],
      defaultL: "",
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid Email Address",
      ],
    },
    password: {
      type: String,
      select: false,
      maxLength: [15, "Password should not exceed more then 15 characters"],
      minLength: [6, "Password should have atleast 6 characters"],
    },
  },
  { timestamps: true }
);

userModel.pre("save", function () {
  if (!this.isModified("password")) {
    return;
  }
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

userModel.methods.comparepassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userModel.methods.getjwttoken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const User = mongoose.model("user", userModel);
export default User;
