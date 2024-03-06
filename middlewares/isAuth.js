const jwt = require('jsonwebtoken');
const secret = 'alfabeta';

function jwtVerify(req, res, next){
    const token= req.headers.authorization;

    if(!token){
      return res.status(400).send({
        ok: false,
        message:"No se proporciona un token"
      })
    }


    jwt.verify(token, secret, (error, payload)=>{
 
         //1-Si El token es incorrecto entoces deberiamos cortar request(peticion)y devolver una respuesta o mensaje
          if(error){
            return res.status(401).send({
                ok:false,
                message:" No tienes autorizacion"
            })
          }
         //2-El token es correcto entonces vamos a continuer con la ejecucion y agregar a la request
         req.user = payload.user;
         //continuamos hacia el  controlador(funcion)correspondiente
         next();
    })
}

module.exports = jwtVerify;