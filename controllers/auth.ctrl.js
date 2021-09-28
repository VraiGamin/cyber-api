const jwt = require("json-web-token");

exports.checkJWT = (req, res, next) => {
	try {
		const token = req.header.authorization.split("")[1];
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
		const userEmail = decodedToken.userEmail;
		if (req.body.userEmail && req.body.userEmail !== userEmail) {
			throw "User ID non valable";
		} else {
			next();
		}
	} catch (error) {
		res.status(401).json({ error: error || "requete non authentifiée" });
	}
};

exports.checkRequest = (req, res, next) => {
	console.warn("test");
};
