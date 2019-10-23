const mongoose = require('mongoose');


// connenet mongoose database
mongoose.connect("mongodb://localhost/restful", {useNewUrlParser: true, useUnifiedTopology: true } );

const connection = mongoose.connection;
connection.on('connected', function () {
    console.log('man has entered database ')
});



module.export = connection;