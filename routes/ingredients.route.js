const express = require("express");
const router = express.Router();
const ingredients = require("../controllers/ingredients.ctrl");

router.get("/", ingredients.getAll); //ok
router.get("/:id", ingredients.getOne); //ok
router.post("/", ingredients.create); //ok
router.post("/:id", ingredients.update); //ok
router.delete("/:id", ingredients.delete); //ok

module.exports = router;
