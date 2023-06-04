const { getAuth } = require("firebase-admin/auth");

async function authMiddleware(req, res, next) {
	try {
		const authToken = req.header("authorization");
		const jwt = authToken.split(" ").at(-1);
		const userInfo = await getAuth().verifyIdToken(jwt);
		req.userInfo = userInfo;
		return next();
	} catch (err) {
		res.sendStatus(401);
	}
}

module.exports = { authMiddleware };
