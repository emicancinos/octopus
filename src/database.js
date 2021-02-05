const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECT, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useFindAndModify: false
})
    .then(db => console.log('Conectado con exito a la base de datos'))
    .catch(error => console.error(err));