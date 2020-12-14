const express = require('express');
const router = express.Router();

const stuffController= require('../controllers/stuff');
const Thing = require('../models/Things');

const auth= require('../middleware/auth');

router.post('/', auth, stuffController.creatThing);
router.get('/:_id', stuffController.getThingById);
router.put('/:_id', auth, stuffController.modifyThing);
router.get('/',  stuffController.getAllThings);
router.get('/:title', stuffController.getThingByTitle);
router.delete('/:id', auth, stuffController.deleteThing);


module.exports = router;
