    import mongoose, { connections } from "mongoose";
    import dotenv from "dotenv";
    dotenv.config();

    export default async function connectDB() {
    mongoose.connect(process.env.DB_URL)
        .then((conn) => console.log(`connected to DB ${conn.connection.name}`))
        .catch(() => {
        console.log("failed to connect to DB");
        process.exit(1); // this will exit the process  and make  stop run node app
        });
    }
