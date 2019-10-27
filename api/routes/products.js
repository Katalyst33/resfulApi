require('dotenv').config();
const express = require('express');
const router = express.Router();
const multer = require('multer');



const Product = require('../models/product');

const checkAuth = require('../middleware/check-auth');

const ProductController = require('../controller/product');


const storage = multer.diskStorage({
destination: function (req, file, cb) {
    cb(null, './uploads');
},
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }


});

const fileFilter = (req, file, cb) => {
// reject a file

    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ){

        cb(null, true);

    }else {
        cb(null, false);

    }
};

const upload = multer( {
    storage:storage,
    limits:{
    filesize:1024 * 1024 * 5
    },
    fileFilter:fileFilter,

});


// const shortid = require('shortid');


//get all product list
router.get('/', ProductController.product_get_all);



//post or create new product route
router.post("/", checkAuth,
    upload.single('productImage'),
    ProductController.product_create_product);

//get a oarticular product by id
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .select('name price _id productImage')
        .exec()
        .then(doc => {

            console.log('from database' + doc);
            if (doc) {
                res.status(200).json({
                    product:doc,
                    request:{
                        type:'GET',
                        description:'Get all products',
                        url:process.env.HOST_URL+'products/'
                    }
                });
            } else {
                res.status(404).json({message: 'No valid entry ID found bro'})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: 'that id is wrong my guy'});

        });


});

//update a product
router.patch('/:productId',
    checkAuth,
    ProductController.product_get_product);


//delete a product by id
router.delete('/:productId',
    checkAuth,
    ProductController.product_get_product);


module.exports = router;