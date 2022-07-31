import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGOATLAS_URL);

const db = mongoose.connection;
const handleOpen = () => console.log("Successfully connected to DB ✅");
const handleError = () => console.log("Cannot connect to DB ❌");

db.once("open", handleOpen);
db.on("error", handleError);