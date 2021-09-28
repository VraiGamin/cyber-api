var Connection = require("tedious").Connection;
var Request = require("tedious").Request;
var TYPES = require("tedious").TYPES;
const jwt = require("jsonwebtoken");
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

exports.login = (req, res, next) => {
	//recupère l'email et le psw
	const email = req.body.email;
	const password = req.body.password;
	//check si l'email existe
	let errorDetected = false;
	var connection = new Connection(config);
	connection.on("connect", function (err) {
		if (err) {
			console.log("ERREUR 1:", err);
			errorDetected = true;
			res.status(500).json({ error: "request failed" });
		}
		getUser();
	});
	connection.connect();

	function getUser() {
		var result = "";
		request = new Request(`SELECT * FROM users WHERE email = @Email FOR JSON PATH, ROOT('User')`, function (err) {
			if (err) {
				console.log("ERREUR 2:", err);
				errorDetected = true;
				res.status(500).json({ error: "Request failed" });
			}
		});
		request.addParameter("Email", TYPES.VarChar, email);

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
				console.log("User: ", result);
				if (result == "") {
					//  si non ERREUR
					res.status(500).json({ error: "No user" });
				}
			}
		});
		connection.execSql(request);
	}
	//  si oui check le psw
	console.log("PSW :", result.password);
	//      si psw bad ERREUR
	//      si psw bon jwt.sign
	//res.send
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
		getUsers();
	});
	connection.connect();

	function getUsers() {
		var result = "";
		request = new Request("SELECT * FROM users FOR JSON PATH, ROOT('Users')", function (err) {
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
		getUser();
	});
	connection.connect();

	function getUser() {
		var result = "";
		request = new Request(`SELECT * FROM users WHERE email = @Email FOR JSON PATH, ROOT('User')`, function (err) {
			if (err) {
				// console.log(err);
				errorDetected = true;
				res.status(500).json({ error: "Request failed" });
			}
		});
		request.addParameter("Email", TYPES.VarChar, req.params.email);

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
		insertUser();
	});
	connection.connect();

	function insertUser() {
		request = new Request("INSERT users (email, password, level) VALUES (@Email, @Password, @Level);", function (
			err
		) {
			if (err) {
				// console.log(err);
				errorDetected = true;
				res.status(500).json({ error: "Request failed" });
			}
		});
		request.addParameter("Email", TYPES.VarChar, req.body.email);
		request.addParameter("Password", TYPES.VarChar, req.body.password);
		request.addParameter("Level", TYPES.Int, req.body.level);

		request.on("requestCompleted", function (rowCount, more) {
			connection.close();
			if (!errorDetected) {
				res.status(200).json({ msg: "User created successfully" });
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
		updateUser();
	});
	connection.connect();

	function updateUser() {
		request = new Request("UPDATE users SET password = @Password, level = @Level WHERE email = @Email;", function (
			err
		) {
			if (err) {
				// console.log(err);
				errorDetected = true;
				res.status(500).json({ error: "Request failed" });
			}
		});
		request.addParameter("Email", TYPES.VarChar, req.params.email);
		request.addParameter("Password", TYPES.Int, req.body.password);
		request.addParameter("Level", TYPES.VarChar, req.body.level);

		request.on("requestCompleted", function (rowCount, more) {
			connection.close();
			if (!errorDetected) {
				res.status(201).json({ msg: "User updated successfully !" });
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
		deleteUser();
	});
	connection.connect();

	function deleteUser() {
		request = new Request("DELETE FROM users WHERE email = @Email", function (err) {
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
				res.status(200).json({ response: "User deleted successfully" });
			}
		});
		connection.execSql(request);
	}
};
