const express = require('express');
const router = express.Router();

const Validations = require('../middleware/validations');

const careerController = require('../controllers/career-controller');


// http://localhost:8000/career
router.post('/career/register',Validations.validate('career'),  careerController.register);
router.get('/career/:id',Validations.validate('id'), careerController.show);
router.get('/careers/getAll', careerController.index);
router.post('/career/destroy/:id', careerController.destroy);
router.post('/career/amend/:id',Validations.validate('career'), careerController.amend);

module.exports = router;