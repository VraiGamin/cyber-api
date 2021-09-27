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
	let errorDetected = false;
	var connection = new Connection(config);
	connection.on("connect", function (err) {
		if (err) {
			// console.log(err);
			errorDetected = true;
			res.status(500).json({ error: "request failed" });
		}
		getFreezebes();
	});
	connection.connect();

	function getFreezebes() {
		var result = "";
		request = new Request("SELECT * FROM freezebe FOR JSON PATH, ROOT('Freezebes')", function (err) {
			if (err) {
				// console.log(err);
				errorDetected = true;
				res.status(500).json({ error: "Request failed" });
			}
		});
		request.on("row", function (columns) {
			columns.forEach(function (column) {
				if (column.value === null) {
					// console.log("NULL");
				} else {
					result += column.value + " ";
				}
			});
		});
		request.on("requestCompleted", function (rowCount, more) {
			connection.close();
			if (!errorDetected) {
				res.status(200).json(result);
			}
		});
		connection.execSql(request);
	}
};
exports.getOne = (req, res, next) => {
	let errorDetected = false;
	var connection = new Connection(config);
	connection.on("connect", function (err) {
		if (err) {
			// console.log(err);
			errorDetected = true;
			res.status(500).json({ error: "request failed" });
		}
		getFreezebe();
	});
	connection.connect();

	function getFreezebe() {
		var result = "";
		request = new Request(`SELECT * FROM freezebe WHERE id = @Id FOR JSON PATH, ROOT('Freezebe')`, function (err) {
			if (err) {
				// console.log(err);
				errorDetected = true;
				res.status(500).json({ error: "Request failed" });
			}
		});
		request.addParameter("Id", TYPES.Int, req.params.id);

		request.on("row", function (columns) {
			columns.forEach(function (column) {
				if (column.value === null) {
					// console.log("NULL");
				} else {
					result += column.value + " ";
				}
			});
		});
		request.on("requestCompleted", function (rowCount, more) {
			connection.close();
			if (!errorDetected) {
				res.status(200).json(result);
			}
		});
		connection.execSql(request);
	}
};
exports.create = (req, res, next) => {
	let errorDetected = false;
	var connection = new Connection(config);
	connection.on("connect", function (err) {
		if (err) {
			// console.log(err);
			errorDetected = true;
			res.status(500).json({ error: "request failed" });
		}
		insertFreezebe();
	});
	connection.connect();

	function insertFreezebe() {
		request = new Request(
			"INSERT freezebe (name, description, pUHT, gamme) OUTPUT INSERTED.id VALUES (@Name, @Description, @PUHT, @Gamme);",
			function (err) {
				if (err) {
					// console.log(err);
					errorDetected = true;
					res.status(500).json({ error: "Request failed" });
				}
			}
		);
		request.addParameter("Name", TYPES.VarChar, req.body.name);
		request.addParameter("Description", TYPES.VarChar, req.body.description);
		request.addParameter("PUHT", TYPES.Float, req.body.pUHT);
		request.addParameter("Gamme", TYPES.VarChar, req.body.gamme);

		request.on("requestCompleted", function (rowCount, more) {
			connection.close();
			if (!errorDetected) {
				res.status(200).json({ msg: "Freezebe inserted successfully" });
			}
		});
		connection.execSql(request);
	}
};
exports.update = (req, res, next) => {
	let errorDetected = false;
	var connection = new Connection(config);
	connection.on("connect", function (err) {
		if (err) {
			// console.log(err);
			errorDetected = true;
			res.status(500).json({ error: "request failed" });
		}
		updateFreezebe();
	});
	connection.connect();

	function updateFreezebe() {
		request = new Request(
			"UPDATE freezebe SET name = @Name, description = @Description, pUHT = @PUHT, gamme = @Gamme WHERE id = @Id;",
			function (err) {
				if (err) {
					// console.log(err);
					errorDetected = true;
					res.status(500).json({ error: "Request failed" });
				}
			}
		);
		request.addParameter("Id", TYPES.Int, req.params.id);
		request.addParameter("Name", TYPES.VarChar, req.body.name);
		request.addParameter("Description", TYPES.VarChar, req.body.description);
		request.addParameter("PUHT", TYPES.Float, req.body.pUHT);
		request.addParameter("Gamme", TYPES.VarChar, req.body.gamme);

		request.on("requestCompleted", function (rowCount, more) {
			connection.close();
			if (!errorDetected) {
				res.status(201).json({ msg: "Freezebe updated successfully !" });
			}
		});
		connection.execSql(request);
	}
};
exports.delete = (req, res, next) => {
	let errorDetected = false;
	var connection = new Connection(config);
	connection.on("connect", function (err) {
		if (err) {
			// console.log(err);
			errorDetected = true;
			res.status(500).json({ error: "request failed" });
		}
		deleteFreezebe();
	});
	connection.connect();

	function deleteFreezebe() {
		request = new Request("DELETE FROM freezebe WHERE id = @Id", function (err) {
			if (err) {
				// console.log(err);
				errorDetected = true;
				res.status(500).json({ error: "Request failed" });
			}
		});
		request.addParameter("Id", TYPES.Int, req.params.id);

		request.on("requestCompleted", function (rowCount, more) {
			connection.close();
			if (!errorDetected) {
				res.status(200).json({ response: "Freezebe deleted successfully" });
			}
		});
		connection.execSql(request);
	}
};
