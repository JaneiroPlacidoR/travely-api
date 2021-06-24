const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.resortPath = '/api/resort';

        //conectar a database
        this.connectDB();
        //middlewares
        this.middlewares();
        //routes
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        //cors
        this.app.use(cors());
        //Lectura y Parseo del body
        this.app.use(express.json());
        //directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.resortPath, require('../routes/room'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;