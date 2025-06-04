import express from "express";
import { connectDb } from "./config/db";
import router from "./routes/userRoutes";
import User from "./models/users";
const app = express();

//Port
const port = process.env.PORT || 8000;
//connect to the database
connectDb()

app.use(express.json());

app.use("/api/users", router);


app.get("/", async (req, res) => {
	res.send("Hello from Express!");

	const user = await User.findOne({ email: req.body.email }); // req.body is undefined for GET
	res.json(user);

});

app.listen(3000, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
