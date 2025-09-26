import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("database Connected");
  } catch (error) {
    console.log(error.message);
  }
};
