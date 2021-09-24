var Connection = require("tedious").Connection;
var Request = require("tedious").Request;
var TYPES = require("tedious").TYPES;
var config = {
	server: `${process.env.DB_SERVER}`,
	authentication: {
		type: "default",
		options: {
			userName: `${process.env.DB_USER}`,
			password: `${process.env.DB_PWD}`,
		},
	},
	options: {
		encrypt: true,
		database: `${process.env.DB_NAME}`,
	},
};

exports.getAll = (req, res, next) => {
	// res.status(200).json({ "msg": "ok" })
	var connection = new Connection(config);
	connection.on("connect", function (err) {
		// If no error, then good to proceed.
		console.log("CONNEXION ON");
		console.log("ERREUR ? ", err);
		executeStatement("SELECT * FROM freezebe");
	});
	connection.connect();

	function executeStatement(req) {
		data = [];
		request = new Request(req, function (err) {
			if (err) {
				console.log(err);
			}
		});
		var result = "";
		request.on("row", function (columns) {
			columns.forEach(function (column) {
				if (column.value === null) {
					console.log("NULL");
				} else {
					result += column.value + " ";
				}
			});
			console.log(result);
			data.push(result);
			result = "";
		});

		request.on("done", function (rowCount, more) {
			console.log(rowCount + " rows returned");
		});

		// Close the connection after the final event emitted by the request, after the callback passes
		request.on("requestCompleted", function (rowCount, more) {
			connection.close();
			res.status(200).json(data);
		});
		connection.execSql(request);
	}
};
exports.getOne = (req, res, next) => {
	console.log("GET getOne");
	res.status(200).json({ msg: "ok" });
};
exports.create = (req, res, next) => {
	console.log("POST create");
	res.status(200).json({ msg: "ok" });
};
exports.update = (req, res, next) => {
	console.log("POST update");
	res.status(200).json({ msg: "ok" });
};
exports.delete = (req, res, next) => {
	console.log("DELETE delete");
	res.status(200).json({ msg: "ok" });
};
