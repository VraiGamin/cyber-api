const express = require('express');
const router = express.Router();
const processCtrl = require('../controllers/process.ctrl');

router.get('/', processCtrl.getAll); //
router.get('/:id', processCtrl.getOne); //
router.post('/', processCtrl.create); //
router.post('/:id', processCtrl.update); //
router.delete('/:id', processCtrl.delete); //

module.exports = router;