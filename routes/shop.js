const path = require('path');
const rootDir = require('../util/path');
const express = require('express');
const router = express.Router(); 

const adminData = require('./admin');

router.get('/', (req, res, next) => {
    console.log('in another middleware');
    const products = adminData.products;
    res.render('shop', {
        prods: products, 
        pageTitle: 'Shop', 
        path:'/', 
        hasProducts : products.length > 0,
        activeShop: true,
        productCSS: true
    });

    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});
 
module.exports = router;