const jwt = require("json-web-token");

exports.checkJWT = (req, res, next) => {
	// req.accepts("Authorization");
	try {
		console.log("Authorization:", req.get("Authorization"));
		const token = req.get("Authorization").split("")[1];
		console.log("token1");
		const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
		console.log("token");
		console.log("token:", decodedToken);
		const userEmail = decodedToken.userEmail;
		if (req.body.userEmail && req.body.userEmail !== userEmail) {
			throw "User ID non valable";
		} else {
			console.log("success");
			next();
		}
	} catch (error) {
		res.status(401).json({ error: error || "requete non authentifiée" });
		// console.log("Authorization:", req.authorization);
	}
};

exports.checkRequest = (req, res, next) => {
	console.warn("test");
};
