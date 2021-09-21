const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.ctrl');

router.get('/', userCtrl.getAllUsers); //ok
// router.get('/:id', userCtrl.getOneUser); //ok
// router.post('/', userCtrl.createUser); //ok
// router.put('/:id', userCtrl.updateUser); //ok
// router.delete('/:id', userCtrl.deleteUser); //ok

module.exports = router;