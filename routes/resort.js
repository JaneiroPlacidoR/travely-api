const { Router } = require('express');
const {
    resortGet,
    resortPost,
    resortPut,
    resortDelete
} = require('../controller/resort');

const router = Router();

router.get('/', resortGet);

router.post('/', resortPost);

router.put('/:id', resortPut);

router.delete('/:id', resortDelete);

module.exports = router;