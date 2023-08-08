import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const result = await mongoose.connect(process.env.MONGO_URI)
    console.log(`Database connected!! ${result.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};
export default connectDB;
