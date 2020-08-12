const express = require('express');
const router = express.Router();
let ProductController = require('../controllers/productController');

router.get('/api/products', ProductController.getAllProducts);
router.get('/api/products/:id', ProductController.getOneProduct);

router.put('/api/update', ProductController.updateProducts)

router.delete('api/remove', ProductController.removeProduct);

router.post('api/add', ProductController.addProduct)


module.exports = router;