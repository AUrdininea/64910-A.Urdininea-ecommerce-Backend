const Category = require("../models/category.model");

async function getCategories(req, res) {
  try {
    const categories = await Category.find();// Asincrono devuelve una promesa

    return res.send({
      ok: true,
      categories
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      message: "Error del servidor",
    });
  }
}    
// Esta funcion se encarga de crear la categoria
 async function postCategory(req, res){
    
    // Tenemos que obtener los datos que me mandan de la nueva categoria
    try {
      
        const category = new Category(req.body)

        const categoryDB = await category.save()

        return res.status(201).send({
            ok:true,
            category:categoryDB
        })
        


        
    } catch (error) {
        onsole.log(error);
    res.status(500).send({
      ok: false,
      message: "Error del servidor",
    });
    }
    
 }

module.exports = {
  getCategories,
  postCategory
};
