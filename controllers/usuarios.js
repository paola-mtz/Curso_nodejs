const bcryptjs = require("bcryptjs");
const { request, response } =require("express");
const pool= require("../db/conexion")
const usuariosQueries=require("../models/usuarios");


const usuariosGET=async(req=request, res=response)=>{

    let {limite = 5, desde = 0} =req.query;

    desde = parseInt(desde);
    limite = parseInt(limite);

    if (!Number.isInteger(limite) || !Number.isInteger(desde)) {
        res.status(400).json({ msg: "No se puede realizar esta consulta." });
        return;
    }

    let conn;
    try {
        conn= await pool.getConnection();
        const usuarios=await conn.query(usuariosQueries.selectUsuarios,[parseInt(desde),parseInt(limit),]);
        res.json({usuarios});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Por favor contacte al administrador.", error});
    } finally{
        if(conn) conn.end();
    }
};
const usuariosPOST=async(req=request, res=response)=>{
    const{nombre, email, password, status=1}=req.body;
    let conn;
    try {
        const salt=bcryptjs.genSaltSync();
        const passwordHash= bcryptjs.hashSync(password,salt);

        conn= await pool.getConnection();
        const usuarios=await conn.query(usuariosQueries.insertUsuario,[nombre, email, passwordHash, status,]);
        res.json({usuarios});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Por favor contacte al administrador",error});
    } finally{
        if(conn) conn.end();
    }
};
const usuariosPUT=async(req, res)=>{
    const {email} = req.query;
    const {nombre, status}= req.body;
    let conn;
    try {
        conn= await pool.getConnection();
        const usuarios=await conn.query(usuariosQueries.updateUsuario,[nombre, status, email,]);
        res.json({usuarios});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Por favor contacte al administrador",error});
    } finally{
        if(conn) conn.end();
    }
};
const usuariosDELETE=async(req, res)=>{
    const {email} = req.query;
    let conn;
    try {
        conn= await pool.getConnection();
        const usuarios=await conn.query(usuariosQueries.deleteUsuario,[email]);
        res.json({usuarios});
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({msg:"Por favor contacte al administrador",error});
    } finally{
        if(conn) conn.end();
    }
};

const usuarioSignin = async (req = request, res = response) => {
    const { email, password } =  req.body;

    let conn;
    try{
        conn = await pool.getConnection();
        const usuarios = await conn.query(usuariosQueries.getUsuarioByEmail, [email],);
        if (usuarios.length === 0) {
            res.status(404).json({ msg: `No se encontró el usuario ${email}.` });
            return;
        }

        const passwordValido = bcryptjs.compareSync(password, usuarios[0].password);
        console.log(usuarios[0].password);
        if (!passwordValido) {
            res.status(401).json({ msg: "La contraseña no coincide" });
            return;
        }
        res.json({ msg: "Inicio de sesión satisfactorio." });
    } catch (error) {
        console.log(error);
        res
        .status(500)
        .json({ msg: "Por favor contacte al administrador.", error});
    } finally {
        if (conn) conn.end();
    }
};

module.exports={usuariosGET,usuariosPOST,usuariosPUT,usuariosDELETE, usuarioSignin,};