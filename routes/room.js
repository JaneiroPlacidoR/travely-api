const { Router } = require('express');
const { check } = require('express-validator');
const {
    roomsGet,
    oneRoomGet,
    roomPost,
    roomPut,
    roomDelete
} = require('../controller/room');
const {
    validateFields, idExistValidate,
    emailExistValidate, rncExistValidate
} = require('../middlewares/validate-fields');

const router = Router();

router.get('/', roomsGet);

router.get('/:id', [
    //validation id is a mongo id
    check('id', '1-It is not a valid id').isMongoId(),
    //validation id mongo exist
    check('id').custom(idExistValidate),
    validateFields
], oneRoomGet);

router.post('/', [
    //validation if fields are not empty
    check('name', 'Name is required').not().isEmpty(),
    check('place', 'Place is required').not().isEmpty(),
    check('amountRooms', 'amountRooms is required').not().isEmpty(),
    check('rate', 'Rate is required').not().isEmpty(),
    check('rnc', 'RNC is required').not().isEmpty(),
    //validation what rnc field is 10 length
    check('rnc', 'Invalid RNC').isLength({ min: 10, max: 10 }),
    check('rnc').custom(rncExistValidate),
    check('email').custom(emailExistValidate),
    //validation if fields are not empty
    check('nickname', 'Nickname is required').not().isEmpty(),
    check('typeRoom', 'Type is required').not().isEmpty(),
    check('price', 'Price is required').not().isEmpty(),
    check('noRoom', 'No. is required').not().isEmpty(),
    check('img', 'Img is required').not().isEmpty(),
    validateFields
], roomPost);

router.put('/:id', [
    //validation id is a mongo id
    check('id', '2-It is not a valid id').isMongoId(),
    //validation id mongo exist
    check('id').custom(idExistValidate),
    validateFields
], roomPut);

router.delete('/:id', [
    //validation id is a mongo id
    check('id', '3-It is not a valid id').isMongoId(),
    //validation id mongo exist
    check('id').custom(idExistValidate),
    validateFields
], roomDelete);

module.exports = router;