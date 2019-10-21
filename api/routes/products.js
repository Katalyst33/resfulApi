const express = require('express');

const router = express.Router();


//get all product list
router.get('/', (req, res, next) => {
    res.status(200).json({
        message:"hadling GEt zrequest to /products homies"
    });
});

//post or create new product route
router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        price:req.body.price,
        Time:new Date()

};

    res.status(201).json({
        message:"hadling POST zrequest to /products broo",
        createdProduct: product
    });
});

//get a oarticular product by id
router.get('/:productId', (req, res, next) => {
    const id =req.params.productId;
    if(id === 'special'){
        res.status(200).json({
            message: "you discovered the id igwe",
            id: id
        });
    }else {
            res.status(200).json({
                message:'you passed an ID',
            });
        }

    });

//update a product
router.patch('/:productId', (req, res, next) =>{
    res.status(200).json({
        message: 'updated product My guy'
    });
});


//delete a product by id
router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message:"its gonna delete bro"
    });
});



module.exports = router;