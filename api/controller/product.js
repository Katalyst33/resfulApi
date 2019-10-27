
const mongoose = require('mongoose');
const Product = require('../models/product');



exports.product_get_all = (req, res, next) => {
    Product.find()
        .select('name price _id productImage')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products:docs.map(doc => {


                    return {
                        _id:doc._id,
                        name: doc.name,
                        price: doc.price,
                        productImage: doc.productImage,
                        request:{
                            type:'GET',
                            url:process.env.HOST_URL +'products/' + doc._id

                        },
                    }

                })
            };


            if (docs.length >= 0) {
                res.status(200).json(response);

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
}

exports.product_create_product = (req, res, next) => {
    console.log(req.file);

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path,
        time: new Date()
    });
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "product added to database successful",
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: process.env.HOST_URL+'products/' + result._id
                    }
                }
            });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });


}


exports.product_get_product = (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value

    }

    Product.update({_id: id}, {$set: updateOps})

        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message:'Product updated',
                request:{
                    type:'GET',
                    url:process.env.HOST_URL +id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

}



exports.product_delete_product = (req, res, next) => {
    const id = req.params.productId;
    Product.deleteOne({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'product deleted',
                request:{
                    type:'POST',
                    url:process.env.HOST_URL+'products/',
                    body:{
                        name:'String',
                        price: 'Number'
                    }
                }
            });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'product deleted'});
        });
}