import mongoose from "mongoose";

async function connectDB() {
  if (!process.env.MONGO_KEY_URL) {
    throw new Error("MONGO_KEY_URL não definida no .env");
  }

  await mongoose.connect(process.env.MONGO_KEY_URL);
  console.log("MongoDB conectado");

  return mongoose.connection;
}

export default connectDB;
