const { Router } = require('express');
const { check } = require('express-validator');
const {
    resortsGet,
    oneResortGet,
    resortPost,
    resortPut,
    resortDelete
} = require('../controller/resort');
const { validateFields, idExistValidate } = require('../middlewares/validate-fields');

const router = Router();

router.get('/', resortsGet);

router.get('/:id', [
    //validation id is a mongo id
    check('id', 'It is not a valid id').isMongoId(),
    //validation id mongo exist
    check('id').custom(idExistValidate),
    validateFields
], oneResortGet);

router.post('/', [
    //validation if fields are not empty
    check('name', 'Name is required').not().isEmpty(),
    check('place', 'Place is required').not().isEmpty(),
    check('amountRooms', 'amountRooms is required').not().isEmpty(),
    check('rate', 'Rate is required').not().isEmpty(),
    check('rnc', 'RNC is required').not().isEmpty(),
    //validation what rnc field is 10 length
    check('rnc', 'Invalid RNC').isLength({ min: 10, max: 10 }),
    validateFields
], resortPost);

router.put('/:id', [
    //validation id is a mongo id
    check('id', 'It is not a valid id').isMongoId(),
    //validation id mongo exist
    check('id').custom(idExistValidate),
    validateFields
], resortPut);

router.delete('/:id', [
    //validation id is a mongo id
    check('id', 'It is not a valid id').isMongoId(),
    //validation id mongo exist
    check('id').custom(idExistValidate),
    validateFields
], resortDelete);

module.exports = router;