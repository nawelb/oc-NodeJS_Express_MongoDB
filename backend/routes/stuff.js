const express = require('express');
const router = express.Router();

const stuffController= require('../controllers/stuff');
const Thing = require('../models/Things');

const auth= require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, stuffController.creatThing);
router.get('/:_id',auth, stuffController.getThingById);
router.put('/:_id', auth, multer, stuffController.modifyThing);
router.get('/', auth, stuffController.getAllThings);
//router.get('/:title', stuffController.getThingByTitle);
router.delete('/:_id', auth, stuffController.deleteThing);


module.exports = router;
