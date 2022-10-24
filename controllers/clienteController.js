const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Cliente = mongoose.model('Cliente');

router.get('/', (req, res) => {
    res.render("cliente/addEditCliente", {
        viewTitle: "Agregar Cliente"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var cliente = new Cliente();
    cliente.nombreCliente = req.body.nombreCliente;
    cliente.ruc = req.body.ruc;
    cliente.razonSocial = req.body.razonSocial;
    cliente.montoVenta = req.body.montoVenta;
    cliente.save((err, doc) => {
        if (!err)
            res.redirect('cliente/listCliente');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("cliente/addEditCliente", {
                    viewTitle: "Insertar nuevo cliente",
                    cliente: req.body
                });
            }
            else
                console.log('Error durante la insercion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Cliente.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('cliente/listCliente'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("cliente/addEditCliente", {
                    viewTitle: 'Actualizar informacion',
                    cliente: req.body
                });
            }
            else
                console.log('Error durante la actualizacion : ' + err);
        }
    });
}


router.get('/listCliente', (req, res) => {
    Cliente.find((err, docs) => {
        if (!err) {
            res.render("cliente/listCliente", {
                listCliente: docs
            });
        }
        else {
            console.log('Error en actualizar la lista de clientes :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'nombreCliente':
                body['nombreClienteError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Cliente.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("cliente/addEditCliente", {
                viewTitle: "Actualizar cliente",
                cliente: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Cliente.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/cliente/listCliente');
        }
        else { console.log('Error en eliminar el cliente :' + err); }
    });
});


module.exports = router;