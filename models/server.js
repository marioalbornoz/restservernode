const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.db');
const fileUpload = require('express-fileupload');


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            uploads: '/api/uploads',
            usuarios: '/api/usuarios',
        }
        // this.usuariosPath = '/api/usuarios';
        // this.authPath ='/api/auth';

        // conectar a bdd
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de la app
        this.routes();
    }

    async conectarDB(){
        console.log('Se ejecuta en este momento conectarDB');
        await dbConnection();
    }

    middlewares(){

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use(express.json());

        // Director publico
        this.app.use( express.static('public'));

        // File upload
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes(){
        this.app.use(this.paths.auth, require('../routes/auth.routes') );
        this.app.use(this.paths.buscar, require('../routes/buscar.routes') );
        this.app.use(this.paths.categorias, require('../routes/categorias.routes') );
        this.app.use(this.paths.productos, require('../routes/productos.routes') );
        this.app.use(this.paths.uploads, require('../routes/uploads.routes') );
        this.app.use(this.paths.usuarios, require('../routes/user.routes') );
    }
    listen(){
        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`)
        })
    }
}


module.exports = Server;