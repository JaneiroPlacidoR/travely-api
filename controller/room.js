const { response, request } = require('express');
const Room = require('../models/room');
const Resort = require('../models/resort');

const roomsGet = async (req = request, res = response) => {

    Room.find({ state: true }, function (err, room) {
        Resort.populate(room, { path: "resort" }, function (err, room) {
            res.status(200).send(room);
        });
    })

}

const oneRoomGet = async (req = request, res = response) => {
    const id = req.params.id;
    
    Room.findById(id, function (err, room) {
        Resort.populate(room, { path: "resort" }, function (err, room) {
            res.status(200).send(room);
        });
    })

   
}

const roomPost = async (req = request, res = response) => {

    const { nickname, typeRoom, price, includes, noRoom, img, resort } = req.body;
    const room = new Room({
        nickname, typeRoom, price, includes, noRoom, img, resort
    });
    const newRoom = await room.save();

    res.json({
        newRoom
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