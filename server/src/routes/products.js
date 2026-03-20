const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  getFeaturedProducts,
} = require('../controllers/productController');

router.get('/featured', getFeaturedProducts);
router.get('/', getAllProducts);
router.get('/:id', getProductById);

module.exports = router;
