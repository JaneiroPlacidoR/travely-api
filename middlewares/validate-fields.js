const { validationResult } = require('express-validator');
const Resort = require('../models/resort');

const validateFields = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next();
}

const idExistValidate = async (id) => {
    const idExist = await Resort.findById(id);
    if (!idExist) {
        throw new Error(`The id is not exist ${id}`);
    }
}

module.exports = {
    validateFields,
    idExistValidate
}