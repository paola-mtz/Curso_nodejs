const express=require('express');
require("dotenv").config();
const app =express();

app.get('/', function(req,res){res.send('Hola Mundo');});

app.listen(process.env.PORT);

//localhost:3000
//localhost:3000