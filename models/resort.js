const { Schema, model } = require('mongoose');

const resortSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    place: {
        type: String,
        required: [true, 'Place is required']
    },
    amountRooms: {
        type: String,
        required: [true, 'amountRooms is required']
    },
    rate: {
        type: String,
        required: [true, 'Rate is required']
    },
    rnc: {
        type: String,
        required: [true, 'RNC is required']
    },
    state: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Resort', resortSchema);
