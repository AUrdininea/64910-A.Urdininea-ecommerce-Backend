const app = require('./app');
const mongoose = require('mongoose');
// mongodb+srv://andresurdininea79:<password>@eit-64910.m0ihagi.mongodb.net/

(async function dbConnrct(){
    try{
      
        await mongoose.connect("mongodb+srv://andresurdininea79:Y9kRpbkMImzOQVkL@eit-64910.m0ihagi.mongodb.net/ecommerce")
            //Pasamos nuestro servidor escuchando
            console.log("CONEXION A LA DB CORRECTA")
            app.listen(3000,() => {
                    console.log('Server is running at port 3000')
                })
            
    } catch(error){
       console.log(error)
    }
})()



// app.get('/',(req, res)=> {
//      console.log(`Endpoint llamando`)
//     res.send('Hello World')
// })


// app.listen(3000,() => {
//     console.log('Server is running at port 3000')
// })
// andresurdininea79
// Y9kRpbkMImzOQVkL