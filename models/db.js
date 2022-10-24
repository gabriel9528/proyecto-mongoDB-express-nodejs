const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://root:root@cluster0.a3uf959.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./employee.model');
require('./producto.model');
require('./cliente.model');