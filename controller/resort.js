const { response, request } = require('express');
const Resort = require('../models/resort');

const resortsGet = async (req = request, res = response) => {

    //way 1 - if one depend of other (more slowly because when one finish other begin)
    // const resorts = await Resort.find({state:true});
    // .limit(12)
    // const total = await Resort.countDocuments({state:true});

    //way 2 - if are indepents (more fast because work both)
    const [total, resorts] = await Promise.all([
        Resort.countDocuments({ state: true }),
        Resort.find({ state: true })
    ])

    res.json({
        total,
        resorts
    })
}

const oneResortGet = async (req = request, res = response) => {

    const id = req.params.id;

    const resort = await Promise.all([
        Resort.findById(id)
    ])

    res.json({
        resort
    })
}

const resortPost = async (req = request, res = response) => {

    const { name, place, amountRooms, rate, rnc, state } = req.body;
    const resort = new Resort({ name, place, amountRooms, rate, rnc, state });

    const rncExist = await Resort.findOne({ rnc });

    if (rncExist) {
        return res.status(400).json({
            message: 'This "Resort" is already registered'
        });
    }

    await resort.save();
    res.json({
        resort
    })
}

const resortPut = async (req = request, res = response) => {
    const id = req.params.id;
    const { _id, ...resto } = req.body;

    const resort = await Resort.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'Resort updated!',
        resort
    })
}

//changing state
const resortDelete = async (req = request, res = response) => {
    const id = req.params.id;
    const resort = await Resort.findByIdAndUpdate(id, { state: false });

    res.json({
        msg: 'Resort deleted!',
        resort
    })
}


module.exports = {
    resortsGet,
    oneResortGet,
    resortPost,
    resortPut,
    resortDelete
}