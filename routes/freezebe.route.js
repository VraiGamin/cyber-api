const express = require("express");
const router = express.Router();
const freezeb = require("../controllers/freezebe.ctrl");

router.get("/", freezeb.getAll); //ok
router.get("/:id", freezeb.getOne); //ok
router.post("/", freezeb.create); //ok
router.post("/:id", freezeb.update); //ok
router.delete("/:id", freezeb.delete); //ok

module.exports = router;
