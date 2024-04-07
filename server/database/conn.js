import mongoose from "mongoose";
import dotenv from 'dotenv'
// import { MongoMemoryServer } from "mongodb-memory-server";

// async function connect() {
//     const mongod = await MongoMemoryServer.create();
//     const getUri = mongod.getUri();
//     mongoose.set('strictQuery', true)
//     const db = await mongoose.connect(getUri);
//     console.log("Database Connected");
//     return db
// }
dotenv.config();

async function connect() {
    const getUri = process.env.MONGODB_URL; // Corrected the variable name
    mongoose.set('strictQuery', true);

    try {
        const db = await mongoose.connect(getUri);

        console.log("Database Connected");
        return db;
    } catch (error) {
        console.error("Error connecting to database:", error);
        throw error;
    }
}

export default connect;

