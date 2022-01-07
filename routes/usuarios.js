const{Router}= require("express");
const{
    usuariosGET,
    usuariosPOST,
    usuariosPUT,
    usuariosDELETE,
    usuarioSignin
} = require("../controllers/usuarios");

const router=Router();

//localhots:3001/usuarios/

router.get("/",usuariosGET);
router.post("/",usuariosPOST);
router.put("/",usuariosPUT);
router.delete("/",usuariosDELETE);
router.post("/signin/",usuarioSignin);

module.exports=router;