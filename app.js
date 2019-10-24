require('dotenv').config();
const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');

const orderRoutes = require('./api/routes/orders');



//db connection


require  ('./api/connection');


// console log information about a request
app.use(logger('dev'));

//to parsee the body of incoming request (body-parser)
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        "Access-Control-Allow-header",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});




///product routes handler which is saved in products file
app.use('/products', productRoutes);


///product routes handler which is saved in order file
app.use('/orders', orderRoutes);


//error handling for undefined routes in the project
app.use((req, res, next) => {
    const error = new Error('page not found amigo');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});


module.exports = app;