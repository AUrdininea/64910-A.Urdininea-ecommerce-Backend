const express = require('express');
//Iniciamos el objeto Router para poder definir rutas
const router = express.Router();
const isAdmin = require('../middlewares/isAdmin')
const jwtVerify = require('../middlewares/isAuth')
const uploadImage = require('../middlewares/uploadUserImage')

const userController = require("../controllers/user.controller")

//Definir ruta para obtener los usuarios GET
router.get('/users/:id?' ,userController.getUsers)

//Agregamos un nuevo usuario POST
router.post('/users',uploadImage,userController.createUser);

//Borrar usuario DELETE
router.delete('/users/:idUser',[jwtVerify,isAdmin] ,userController.deleteUser)
// ,jwtVerify


//Actualizar un usuario PUT
router.put('/users/:id',[jwtVerify,isAdmin,uploadImage], userController.updatetUser)

//Buscador de usuarios  que se puede usar paraproductos tambien
router.get('/users/search/:search', userController.searchUser)

//Login de usuario
router.post('/login',userController.login)








//Exportamos router para poder usar rutas en app.js
module.exports = router;