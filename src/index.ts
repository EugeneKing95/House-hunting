
import express from "express";

const app = express();

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
	res.send("Hello from Express!");

});

app.listen(3000, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
