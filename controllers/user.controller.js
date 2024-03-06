const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const secret = "alfabeta";

//Obtener USUARIOS o un usuario ESPECIFICO POR ID
async function getUsers(req, res) {
  try {
    const id = req.params.id;

    if (id) {
      //ocultar password
      const user = await User.findById(id, { password: 0 });

      if (!user) {
        return res.status(404).send({
          ok: false,
          message: "No se encontro el usuario",
        });
      }

      user.password = undefined; //ocultar password

      return res.send({
        ok: true,
        user: user,
        message: "Usuario encontrado",
      });
    }

    const limit = parseInt(req.query.limit) || 5; // PAGINACION
    const page = parseInt(req.query.page) || 0; // PAGINACION

    

    const users = await User.find()
          .limit(limit) // PAGINACION
          .skip(page * limit) // PAGINACION
          .collation({ 
            locale: "es"
          })
          .sort({
            name: 1,
          })
          .select({
            password: 0,
            __v: 0,
          });

       const total = await User.countDocuments();



    if (!users.length) {
      return res.status(404).send({
        ok: false,
        message: "Nose encontraron usuarios",
      });
    }

    //Devolvemos todos los usuario
    res.send({
      ok: true,
      users: users,
      message: "Usuasrio encontrados",
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      message: "No se pudo obtener los usuarios",
    });
  }
}

//Funcion para Crear Usuario
async function createUser(req, res) {

  try {
    const user = new User(req.body);

    if(req.file?.filename){
      user.image = req.file.filename 
    }
 
    
    //!Encriptar contraseña
    user.password = await bcrypt.hash(user.password, saltRounds);

    // Guardamos el usuario
    const userSaved = await user.save();

    //Borramos contraseña DEL OBJETO
    userSaved.password = undefined; //es para no mostrar la password

    res.status(201).send({
      ok: true,
      message: "Usuario creado correctamente",
      user: userSaved,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      message: "No se pudo crear el usuario",
    });
  }
}

//Borrar Usuario DELETE

async function deleteUser(req, res) {
  try {
    //Comprobar si la persona que desea borrar es un ADMIN_ROLE
    console.log(req.user.role);
    //Chequeo si el role del usuario NO ES ADMIN y no lo dejo continuar
    if (req.user.role != "ADMIN_ROLE") {
      return res.status(403).send({
        ok: false,
        message: "No tiene permiso para borrar usuarios",
      });
    }

    const id = req.params.idUser;

    const userDeleted = await User.findByIdAndDelete(id);

    if (!userDeleted) {
      return res.status(404).send({
        ok: false,
        message: "No se encontro el usuario",
      });
    }

    res.send({
      ok: true,
      message: "Usuario borrado correctamente",
      user: userDeleted,
    });
  } catch (error) {
    console.log(error);
    res.send("No se pudo borra usuario");
  }
}

//Actualizar Usuario
async function updatetUser(req, res) {
  try {
    if (req.user.role !== "ADMIN_ROLE") {
      return res.status(403).send({
        ok: false,
        message: "No tienes permiso para actualizar usuarios",
      });
    }
    const id = req.params.id;
    const nuevosValores = req.body;

    const userUpdate = await User.findByIdAndUpdate(id, nuevosValores, {
      new: true,
    });

    res.send({
      ok: true,
      message: "El usuario fue actualizado correctamente",
      user: userUpdate,
    });
  } catch (error) {
    console.log(error);
    res.send({
      ok: false,
      message: "El usuario no se pudo Actualizar",
    });
  }
}

//lOGUIN DEL USUARIO
async function login(req, res) {
  try {
    //obtenemos del body el mail y password
    const { password, email } = req.body;

    if (!password || !email) {
      return res.status(400).send({
        ok: false,
        message: "Faltan datos",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    //Si no existe el usuario
    if (!user) {
      return res.status(404).send({
        ok: false,
        message: "Datos incorrectos",
      });
    }

    //--Si existe el usuario comparamos la contraseña
    const verifiedUser = await bcrypt.compare(password, user?.password);

    //Si la contraseña no es correcta
    if (!verifiedUser) {
      return res.status(404).send({
        ok: false,
        message: "Datos incorrectos",
      });
    }

    //--------------------------------------------
    //Realizar el login y devolver la respuesta correcta
    user.password = undefined;

    //Generar un token para  paraproteger datos de usuario
    const token = jwt.sign({ user }, secret, { expiresIn: "1h" });

    res.send({
      ok: true,
      message: "Login correcto",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      message: "No se pudo hacer el login",
    });
  }
}


//Buscar Usuario
async function searchUser(req, res){

    try {
      const search = new RegExp( req.params.search,'i')  //Nombre

      console.log(search)
     
      const users = await User.find({
          $or:[
          {name:  search},
         {email:  search}
        ]
      })

      console.log(users)
      return res.send({
        ok:true,
        message:"Usuarios encontrados",
        users
      })
      
    } catch (error) {
      console.log(error)
      res.status(500).send({
        ok:false,
        message:"No se pudo buscar el usuario"
      })
    }

}





module.exports = {
  createUser,
  deleteUser,
  updatetUser,
  getUsers,
  login,
  searchUser
};
