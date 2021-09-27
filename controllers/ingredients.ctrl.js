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
		getIngredients();
	});
	connection.connect();

	function getIngredients() {
		var result = "";
		request = new Request("SELECT * FROM ingredients FOR JSON PATH, ROOT('Ingredients')", function (err) {
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
			console.log(result);
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
		getIngredient();
	});
	connection.connect();

	function getIngredient() {
		var result = "";
		request = new Request(`SELECT * FROM ingredients WHERE id = @Id FOR JSON PATH, ROOT('Ingredient')`, function (
			err
		) {
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
		insertIngredient();
	});
	connection.connect();

	function insertIngredient() {
		request = new Request("INSERT ingredients (name, description) VALUES (@Name, @Description);", function (err) {
			if (err) {
				// console.log(err);
				errorDetected = true;
				res.status(500).json({ error: "Request failed" });
			}
		});
		request.addParameter("Name", TYPES.VarChar, req.body.name);
		request.addParameter("Description", TYPES.VarChar, req.body.description);

		request.on("requestCompleted", function (rowCount, more) {
			connection.close();
			if (!errorDetected) {
				res.status(200).json({ msg: "Ingredient inserted successfully" });
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
			"UPDATE ingredients SET name = @Name, description = @Description WHERE id = @Id;",
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

		request.on("requestCompleted", function (rowCount, more) {
			connection.close();
			if (!errorDetected) {
				res.status(201).json({ msg: "Ingredient updated successfully !" });
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
		request = new Request("DELETE FROM ingredients WHERE id = @Id", function (err) {
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
				res.status(200).json({ response: "Ingredient deleted successfully" });
			}
		});
		connection.execSql(request);
	}
};
