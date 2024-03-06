const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: false,
    minlength: 3,
    maxlength: 100,
    trim: true,
    validate: {
      validator: function (title) {
        const regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/;
        return regex.test(title);
      },
    },
  },
  
  description: {
    type: String,
    required: false,
    minlength: 4,
    maxlength: 300,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 510000,
    max: 120000000,
  },
  image: {
    type: String,
    required: false,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
