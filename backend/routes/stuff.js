const express = require('express');
const router = express.Router();

const stuffController= require('../controllers/stuff');
const Thing = require('../models/Things');

router.post('/', stuffController.creatThing);
router.get('/:_id', stuffController.getThingById);
router.put('/:_id', stuffController.modifyThing);
router.get('/', stuffController.getAllThings);
router.get('/:title', stuffController.getThingByTitle);
router.delete('/:id', stuffController.deleteThing);


module.exports = router;
