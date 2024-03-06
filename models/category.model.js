const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const categorySchema = new Schema({
 
    name:{
        type: String,
        required: true,
        unique:true,
         trim:true,
         minlength:3,
         maxlength:50,
        },
        description:{
            type: String,
            required: false,
             trim: true,
             minlength:8,
             maxlength:300,
            },
           
})

module.exports = mongoose.model('Category', categorySchema)
