const Location = require("../models/location.model");

async function getLocations(req, res) {
  try {
    const locations = await Location.find();// Asincrono devuelve una promesa

    return res.send({
      ok: true,
      locations,
      message: "Se creo la localidad",
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
 async function postLocation(req, res){
    
    // Tenemos que obtener los datos que me mandan de la nueva categoria
    try {
      
        const location = new Location(req.body)

        const locationDB = await location.save()

        return res.status(201).send({
            ok:true,
            location:locationDB
        })
        


        
    } catch (error) {
        console.log(error);
    res.status(500).send({
      ok: false,
      message: "Error del servidor",
    });
    }
    
 }

module.exports = {
  getLocations,
  postLocation
};
