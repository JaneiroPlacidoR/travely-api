const { response, request } = require('express');

const resortGet = (req = request, res = response) => {
    const { q, j = "no name" } = req.query;

    res.json({
        msg: 'get api - controlador',
        q,
        j
    })
}

const resortPost = (req, res = response) => {
    const body = req.body;

    res.json({
        msg: 'post api -controller',
        body
    })
}

const resortPut = (req, res = response) => {
    const id = req.params.id;
    res.json({
        msg: 'put api -controller',
        id
    })
}

const resortDelete = (req, res = response) => {
    const id = req.params.id;

    res.json({
        msg: 'delete api',
        id
    })
}

module.exports = {
    resortGet,
    resortPost,
    resortPut,
    resortDelete
}