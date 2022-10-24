const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Producto = mongoose.model('Producto');

router.get('/', (req, res) => {
    res.render("producto/addEditProduct", {
        viewTitle: "Agregar producto"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var producto = new Producto();
    producto.nombreProducto = req.body.nombreProducto;
    producto.precio = req.body.precio;
    producto.stock = req.body.stock;
    producto.categoria = req.body.categoria;
    producto.save((err, doc) => {
        if (!err)
            res.redirect('producto/listProduct');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("producto/addEditProduct", {
                    viewTitle: "Insertar nuevo producto",
                    producto: req.body
                });
            }
            else
                console.log('Error durante la insercion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Producto.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('producto/listProduct'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("producto/addEditProduct", {
                    viewTitle: 'Actualizar informacion',
                    producto: req.body
                });
            }
            else
                console.log('Error durante la actualizacion : ' + err);
        }
    });
}


router.get('/listProduct', (req, res) => {
    Producto.find((err, docs) => {
        if (!err) {
            res.render("producto/listProduct", {
                listProduct: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'nombreProducto':
                body['nombreProductoError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Producto.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("producto/addEditProduct", {
                viewTitle: "Actualizar producto",
                producto: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Producto.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/producto/listProduct');
        }
        else { console.log('Error in product delete :' + err); }
    });
});


module.exports = router;