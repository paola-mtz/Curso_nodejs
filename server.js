const express =require('express');
const cors = require("cors");

class Server{
    constructor(){
        this.app=express();
        this.PORT=process.env.PORT;
        this.rutasUsuarios="/usuarios";
        
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
    };

    routes(){
        this.app.use(this.rutasUsuarios, require ("./routes/usuarios"));
    }

    listen (){
        this.app.listen(process.env.PORT); 
    }
} 

module.exports=Server;