import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.DB_URL);
    console.log(`Connected to DB: ${conn.connection.name}`);
  } catch (err) {
    console.error("DB connection error:", err.message);
    process.exit(1);
  }
}
