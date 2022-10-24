const mongoose = require('mongoose');

var clienteSchema = new mongoose.Schema({
    nombreCliente: {
        type: String,
        required: 'This field is required.'
    },
    ruc: {
        type: Number,
    },
    razonSocial: {
        type: String,
    },
    montoVenta: {
        type: Number,
    }
});


mongoose.model('Cliente', clienteSchema);