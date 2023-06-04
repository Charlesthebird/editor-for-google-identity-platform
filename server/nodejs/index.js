const express = require("express");
const cors = require("cors");
const { authMiddleware } = require("./auth");
const { getAuth } = require("firebase-admin/auth");
const { v4: uuidv4 } = require("uuid");
var bodyParser = require("body-parser");
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

//
// Firebase app
//
const { initializeApp } = require("firebase-admin/app");
initializeApp({ projectId: "my-website-340021" });

//
// CORS
//
app.use(
	cors({
		origin: ["http://localhost:3000", "http://localhost:4000"],
		allowedHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	})
);

//
// Users - CRUD
//
app.use(authMiddleware);

app.put("/admin/users", async (req, res) => {
	try {
		if (!req.body.newEmail) {
			res.sendStatus(500, error);
			return;
		}
		const result = await getAuth().createUser({
			email: req.body.newEmail,
			password: uuidv4().replaceAll("-", ""),
		});
		await getAuth().setCustomUserClaims(result.uid, req.body.newClaims);
		res.json(result);
	} catch (error) {
		res.sendStatus(500, error);
	}
});

app.get("/admin/users", async (req, res) => {
	// List batch of users (1000 at a time).
	try {
		const result = await getAuth().listUsers();
		res.json(result.users);
	} catch (error) {
		res.sendStatus(500, error);
	}
});

app.post("/admin/users", async (req, res) => {
	try {
		if (!req.body.uid) {
			res.sendStatus(500, error);
			return;
		}
		await getAuth().setCustomUserClaims(req.body.uid, req.body.newClaims);
		res.json({ msg: "Updated user!" });
	} catch (error) {
		res.sendStatus(500, error);
	}
});

app.delete("/admin/users", async (req, res) => {
	try {
		if (!req.body.uid) {
			res.sendStatus(500, error);
			return;
		}
		await getAuth().deleteUser(req.body.uid);
		res.json({ msg: "Deleted user!" });
	} catch (error) {
		res.sendStatus(500, error);
	}
});

app.listen(port, () => {
	console.log(`Server started on port: ${port}`);
});
