const express =require('express');

class Server{
    constructor(){
        this.app=express();
        this.port=process.env.PORT;

        this.routers;
    }

    routers(){
        this.app.get('/', function(req,res){res.send('Hola Mundo');});

    }

    listen(){
        this.app.listen(this.port);
    }

}

module.exports=Server;