const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/users.ctrl");

router.post("/login", userCtrl.login); //
router.get("/", userCtrl.getAll); //
router.get("/:id", userCtrl.getOne); //
router.post("/", userCtrl.create); //
router.put("/:id", userCtrl.update); //
router.delete("/:id", userCtrl.delete); //

module.exports = router;
