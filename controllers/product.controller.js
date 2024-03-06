const Product = require("../models/product.model");
// const bcrypt = require('bcrypt')
// const saltRounds = 10;
// const jwt = require('jsonwebtoken')
// const secret = 'alfabeta'

//Obtener productos o un producto ESPECIFICO POR ID
async function getProducts(req, res) {
  try {
    const id = req.params.id;

    if (id) {
      //ocultar password
      const product = await Product.findById(id);

      if (!product) {
        return res.status(404).send({
          ok: false,
          message: "No se encontro el producto",
        });
      }

      return res.send({
        ok: true,
        product: product,
        message: "Producto encontrado",
      });
    }
     
       const limit = parseInt(req.query.limit) || 3;// PAGINACION
        const page  = parseInt(req.query.skip) || 0;// PAGINACION

    const products = await Product.find()
                     .populate("category","name")
                     .limit(3)                 // PAGINACION
                     .skip(page * limit)       // PAGINACION

    if (!products.length) {
      return res.atatus(404).send({
        ok: false,
        message: "Nose encontraron productos",
      });
    }

    //Devolvemos todos los Productos
    res.send({
      ok: true,
      products: products,
      message: "Productos encontrados encontrados",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      message: "No se pudieron obtener los productos",
    });
  }
}

//Funcion para agregar un Producto
// async function createProduct(req, res) {
//   try {
//     const product = new Product(req.body);

//     // Guardamos el producto
//     const productSaved = await product.save();

//     res.status(201).send({
//       ok: true,
//       message: "Producto creado correctamente",
//       product: productSaved,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       ok: false,
//       message: "No se pudo crear el producto",
//     });
//   }
// }
async function createProduct(req, res) {
  try {
      const product = new Product(req.body)

      // con esto cargo el nombre de la imagen en el usuario
      if (req.file?.filename) {
          product.image = req.file.filename;
      }
      const prodcutSave = await product.save();
      res.status(201).send({
          ok: true,
          message: "Producto Creado correctamente",
          product: prodcutSave
      });
  } catch (error) {
      console.log(error)
      res.status(500).send({
          ok: false,
          message: "No se pudo crear el producto"
      });
  }
}
//Borrar producto DELETE

async function deleteProduct(req, res) {
  try {
    //Comprobar si la persona que desea borrar es un ADMIN_ROLE
    console.log(req.user.role);
    //Chequeo si el role del usuario NO ES ADMIN y no lo dejo continuar
    if (req.user.role != "ADMIN_ROLE") {
      return res.status(401).send({
        ok: false,
        message: "No tiene permiso para realizar esta accion",
      });
    }

    const id = req.params.idProduct;

    const productDeleted = await Product.findByIdAndDelete(id);

    if (!productDeleted) {
      return res.status(404).send({
        ok: false,
        message: "No se encontro el Producto",
      });
    }

    res.send({
      ok: true,
      message: "Producto borrado correctamente",
      product: productDeleted,
    });
  } catch (error) {
    console.log(error);
    res.send("No se pudo borra el producto");
  }
}

//Actualizar un Producto
async function updatetProduct(req, res) {
  try {
    const id = req.params.id;
    const nuevosValores = req.body;

    const productUpdate = await Product.findByIdAndUpdate(id, nuevosValores, {
      new: true,
    });

    res.send({
      ok: true,
      message: "El producto fue actualizado correctamente",
      product: productUpdate,
    });
  } catch (error) {
    console.log(error);
    res.send({
      ok: false,
      message: "El producto no se pudo Actualizar",
    });
  }
}

module.exports = {
  createProduct,
  deleteProduct,
  updatetProduct,
  getProducts,
};
