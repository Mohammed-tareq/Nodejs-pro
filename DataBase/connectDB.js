    import mongoose, { connections } from "mongoose";
    import dotenv from "dotenv";
    dotenv.config();

    export default async function connectDB() {
    mongoose.connect(process.env.DB_URL)
        .then((conn) => console.log(`connected to DB ${conn.connection.name}`))
    }
