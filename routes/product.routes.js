const express = require('express');
//Iniciamos el objeto Router para poder definir rutas
const router = express.Router();
const jwtVerify = require('../middlewares/isAuth')
const isAdmin = require('../middlewares/isAdmin')
const uploadImage = require('../middlewares/uploadproductImage')

const productController = require("../controllers/product.controller")

//Definir ruta para obtener los productos GET
router.get('/products/:id?' ,productController.getProducts)

//Agregamos un nuevo producto POST
router.post('/products', [jwtVerify, isAdmin, uploadImage], productController.createProduct)

//Borrar producto DELETE
router.delete('/products/:idProduct' ,[jwtVerify,isAdmin],productController.deleteProduct)



//Actualizar un producto PUT
router.put('/products/:id',[jwtVerify,isAdmin] , productController.updatetProduct)


module.exports = router;