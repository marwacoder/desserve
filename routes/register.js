const express = require('express');
const router = express.Router();

const Validations = require('../middleware/validations')

const registerController = require('../controllers/register-controller');


// http://localhost:8000/register
router.post('/register', Validations.validate('register'), registerController.register);
router.post('/login/action',  registerController.auth);
router.get('/:id',Validations.validate('id'), registerController.show);
router.get('/join/getAll/',Validations.validate('id'), registerController.index);
router.post('/destroy/:id', registerController.destroy);
router.post('/amend/:id',Validations.validate('register'), registerController.amend);

module.exports = router;