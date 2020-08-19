const express = require('express');
const router = express.Router();
let ProductController = require('../controllers/productController');

router.get('/api/products', ProductController.getAllProducts);
router.get('/api/products/:id', ProductController.getOneProduct);

router.get('/api/update', ProductController.updateProducts)

router.delete('/api/remove/:id', ProductController.removeProduct);

router.post('/api/addNew', ProductController.addProduct);


module.exports = router;