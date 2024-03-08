const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  producto: {
    type: String,
    required: false,
    minlength: 3,
    maxlength: 100,
    trim: true,
    
  },
  
  descripcion: {
    type: String,
    required: false,
    minlength: 4,
    maxlength: 600,
    trim: true,
  },
  precio: {
    type: Number,
    required: true,
    min: 1,
    max: 120000000,
  },
  image: {
    type: String,
    
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: false,
  },
  active: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Product", productSchema);
