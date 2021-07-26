const { Router } = require('express');
const {
    searchRoom
} = require('../controller/room');
const router = Router();


router.get('/search/:term/:adults/:children/:rooms', searchRoom);


module.exports = router;