const mongoose = require('mongoose');

var productoSchema = new mongoose.Schema({
    nombreProducto: {
        type: String,
        required: 'This field is required.'
    },
    precio: {
        type: Number,
    },
    stock: {
        type: Number,
    },
    categoria: {
        type: String
    }
});


mongoose.model('Producto', productoSchema);