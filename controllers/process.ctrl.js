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
		getProcesses();
	});
	connection.connect();

	function getProcesses() {
		var result = "";
		request = new Request("SELECT * FROM processes FOR JSON PATH, ROOT('Processes')", function (err) {
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
		getProcess();
	});
	connection.connect();

	function getProcess() {
		var result = "";
		request = new Request(`SELECT * FROM processes WHERE id = @Id FOR JSON PATH, ROOT('Process')`, function (err) {
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
			console.log(err);
			errorDetected = true;
			res.status(500).json({ error: "request failed" });
		}
		insertProcess();
	});
	connection.connect();

	function insertProcess() {
		request = new Request(
			"INSERT processes (name, description, steps, isValidated, idFreezebe) VALUES (@Name, @Description, @Steps, @IsValidated, @idFreezebe);",
			function (err) {
				if (err) {
					console.log(err);
					errorDetected = true;
					res.status(500).json({ error: "Request failed" });
				}
			}
		);
		request.addParameter("Name", TYPES.VarChar, req.body.name);
		request.addParameter("Description", TYPES.VarChar, req.body.description);
		request.addParameter("Steps", TYPES.VarChar, req.body.steps);
		request.addParameter("IsValidated", TYPES.VarChar, req.body.isValidated);
		request.addParameter("IdFreezebe", TYPES.Int, req.body.idFreezebe);

		request.on("requestCompleted", function (rowCount, more) {
			connection.close();
			if (!errorDetected) {
				res.status(200).json({ msg: "Process inserted successfully" });
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
		updateProcess();
	});
	connection.connect();

	function updateProcess() {
		request = new Request(
			"UPDATE processes SET name = @Name, description = @Description, steps = @Steps, isValidated = @IsValidated, idFreezebe = @idFreezebe WHERE id = @Id;",
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
		request.addParameter("Steps", TYPES.VarChar, req.body.steps);
		request.addParameter("IsValidated", TYPES.VarChar, req.body.isValidated);
		request.addParameter("IdFreezebe", TYPES.Int, req.body.idFreezebe);

		request.on("requestCompleted", function (rowCount, more) {
			connection.close();
			if (!errorDetected) {
				res.status(201).json({ msg: "Process updated successfully !" });
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
		request = new Request("DELETE FROM processes WHERE id = @Id", function (err) {
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
				res.status(200).json({ response: "Process deleted successfully" });
			}
		});
		connection.execSql(request);
	}
};
