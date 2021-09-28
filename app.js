require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const freezebeRoutes = require("./routes/freezebe.route");
const ingredientsRoutes = require("./routes/ingredients.route");
const processRoutes = require("./routes/process.route");
const usersRoutes = require("./routes/users.route");

const app = express();

app.use(cors());
app.use(bodyParser.json());

//routing
app.use("/freezebe", freezebeRoutes);
app.use("/ingredients", ingredientsRoutes);
app.use("/process", processRoutes);
app.use("/users", usersRoutes);

module.exports = app;
