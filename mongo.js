import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

// const MONGO_URL = process.env.MONGO_URL;
const MONGO_URL = process.env.MONGO_LOCAL_URL;
const client = new MongoClient(MONGO_URL); 


// await client.connect();
// console.log(process.env.MONGO_URL);

export {client}