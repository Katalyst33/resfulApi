const express = require('express');

const router = express.Router();

//get request when a user visits /orders url
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "orders was fetched (get request)"
    });
});


//create a new order aka post request
router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity,
        Time:new Date()

    };
    res.status(201).json({
        message: "Order was created (post request)",
        order:order
    });
});


//get a perticular order
router.get('/:orderId', (req, res, next) => {
    res.status(201).json({
        message: "your orders of goods have arrived (id)",
        orderId: req.params.orderId

    });
});

router.delete('/:orderId', (req, res, next) => {
    res.status(201).json({
        message: "orders deleted",
        orderId: req.params.orderId
    });
});


module.exports = router;