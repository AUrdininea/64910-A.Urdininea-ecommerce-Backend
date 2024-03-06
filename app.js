const express = require('express');
const app = express();
const cors = require('cors');


const userRoutes = require("./routes/user.routes")
const categoryRoutes = require("./routes/category.routes")
const productRoutes = require("./routes/product.routes")
const locationRoutes= require("./routes/location.routes")
//Middlewares
app.use(express.json());
// app.use(express.urlencoded({extended:true}))

//Compartir carpeta public para subir imagenes
app.use(express.static('public'))


// app.use(express.urlencoded({extended:true}));

app.use(cors());


//Aplicamos o integramos las rutas a nuestro server
app.use([
    userRoutes,
    categoryRoutes,
    productRoutes,
    locationRoutes
])



module.exports = app;