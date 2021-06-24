const { Schema, model } = require('mongoose');

const roomSchema = new Schema({
    nickname: {
        type: String,
        required: [true, 'Nickname is required']
    },
    typeRoom: {
        type: String,
        required: [true, 'Type is required']
    },
    price: {
        type: String,
        required: [true, 'Price is required']
    },
    includes: {
        type: [String]
    },
    noRoom: {
        type: String,
        required: [true, 'No. is required']
    },
    img: {
        type: String,
        required: [true, 'No. is required']
    },
    state: {
        type: Boolean,
        default: true
    },
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
    phone: {
        type: String,
        required: [true, 'Phone number is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    }
});



module.exports = model('Room', roomSchema);
