import express from "express";
import { connectDb } from "./config/db";
const app = express();

//Port
const port = process.env.PORT || 8000;
//connect to the database
connectDb()

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello from Express!");

});

app.listen(3000, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
