const express = require('express');
const router = express.Router();
const ingredients = require('../controllers/ingredients.ctrl');

router.get('/', ingredients.getAll); //
router.get('/:id', ingredients.getOne); //
router.post('/', ingredients.create); //
router.post('/:id', ingredients.update); //
router.delete('/:id', ingredients.delete); //

module.exports = router;