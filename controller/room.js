const { response, request } = require('express');
const Room = require('../models/room');

const roomsGet = async (req = request, res = response) => {

    const [total, rooms] = await Promise.all([
        Room.countDocuments({ state: true }),
        Room.find({ state: true })
    ])

    res.json({
        total,
        rooms
    })
}

const oneRoomGet = async (req = request, res = response) => {
    const id = req.params.id;

    const room = await Promise.all([
        Room.findById(id)
    ])

    res.json({
        room
    })
}

const roomPost = async (req = request, res = response) => {

    const { nickname, typeRoom, price, includes, noRoom, img
        , name, place, amountRooms, rate, rnc, phone, email } = req.body;
    const room = new Room({
        nickname, typeRoom, price, includes, noRoom, img,
        name, place, amountRooms, rate, rnc, phone, email
    });
    await room.save();

    res.json({
        room
    })

}

const roomPut = async (req = request, res = response) => {
    const id = req.params.id;
    const { _id, ...resto } = req.body;

    const room = await Room.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'Room updated!',
        room
    })
}

const roomDelete = async (req = request, res = response) => {
    const id = req.params.id;
    const room = await Room.findByIdAndUpdate(id, { state: false });

    res.json({
        msg: 'Room deleted!',
        room
    })
}


module.exports = {
    roomsGet,
    oneRoomGet,
    roomPost,
    roomPut,
    roomDelete
}