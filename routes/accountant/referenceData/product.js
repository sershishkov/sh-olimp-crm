const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../../middleware/auth');

const {
  addProduct,
  updateProduct,
  getAllProducts,
  getOneProduct,
  deleteProduct
} = require('../../../controllers/accountant/referenceData/product');

router
  .route('/')
  .get(getAllProducts)
  .post(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    addProduct
  );

router
  .route('/:id')
  .get(getOneProduct)
  .put(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    updateProduct
  )
  .delete(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    deleteProduct
  );

module.exports = router;
