const express = require("express");
const router = express.Router();
const processCtrl = require("../controllers/process.ctrl");

router.get("/", processCtrl.getAll); //ok
router.get("/:id", processCtrl.getOne); //ok
router.post("/", processCtrl.create); //ok
router.post("/:id", processCtrl.update); //ok
router.delete("/:id", processCtrl.delete); //ok

module.exports = router;
