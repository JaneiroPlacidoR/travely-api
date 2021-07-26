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

const searchRoom = async  (req = request, res = response) => {

    term = req.params.term;
    let regex = new RegExp(term, 'i');

    Resort.find({ place : regex})
        .exec((err, resortLocalizado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (!resortLocalizado) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            let resorts = [];

            resortLocalizado.forEach(element => {
            resorts.push(element._id);
            });

            if(resortLocalizado.length == 0){
                return res.status(400).json({
                    ok: false,
                    err:"There is not coincidences"
                });
            }

            //////////////////
            adults = req.params.adults;
            children = req.params.children;
            rooms = req.params.rooms;


            //couple room
            if(adults == 2 && children == 0 && rooms == 1){
                //validando que las habitaciones se encuentren en los 
                //resorts del lugar ya introducido y que sean tipo couple
                Room.find({typeRoom:"couple",resort:resorts})
                .exec((err, room) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            err
                        });
                    }

                        res.status(200).json({
                            ok: true,
                            room
                        });

                    });

                    //business room
            }else if(adults == 1 && children == 0 && rooms == 1){
                Room.find({typeRoom:"business",resort:resorts})
                .exec((err, room) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            err
                        });
                    }

                        res.status(200).json({
                            ok: true,
                            room
                        });

                    });
            }else{
                Room.find({typeRoom:"family",resort:resorts})
                .exec((err, room) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            err
                        });
                    }

                        res.status(200).json({
                            ok: true,
                            room
                        });

                    });
            }
        });
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
    searchRoom,
    roomPost,
    roomPut,
    roomDelete
}

