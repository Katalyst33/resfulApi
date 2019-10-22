const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');
const Product = require('../models/product');

// const shortid = require('shortid');


//get all product list
router.get('/', (req, res, next) => {
    Product.find()
        .exec()
        .then(docs => {
            console.log(docs);
            if (docs.length >= 0) {
                res.status(200).json(docs);

            } else {
                res.status(404).json({
                    message: 'No entries found'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//post or create new product route
router.post('/', (req, res, next) => {


    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        time: new Date()
    });
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "hadling POST zrequest to /products broo",
                createdProduct: result
            });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });


});

//get a oarticular product by id
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(doc => {
            console.log('from database' + doc);
            if (doc) {
                res.status(200).json(doc);
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
router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for(const  ops of req.body){
        updateOps[ops.propName] = ops.value

    }

    Product.update({_id: id}, {$set: updateOps})

        .exec()
        .then( result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });

});


//delete a product by id
router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({_id: id})
        .exec()
        .then(res => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


module.exports = router;