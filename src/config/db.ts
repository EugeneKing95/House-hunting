import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

const mongoUrl = process.env.DB_URL as string;

export const connectDb = async () => {
	try {
		await mongoose.connect(mongoUrl);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
		process.exit(1);
	}
}
