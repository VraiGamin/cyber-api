const express = require('express');
const router = express.Router();
const freezeb = require('../controllers/freezebe.ctrl');

router.get('/', freezeb.getAll); //
router.get('/:id', freezeb.getOne); //
router.post('/', freezeb.create); //
router.post('/:id', freezeb.update); //
router.delete('/:id', freezeb.delete); //

module.exports = router;