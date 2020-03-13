const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../../middleware/auth');

const {
  uploadPhoto,
  resizePhoto,
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
    uploadPhoto,
    resizePhoto,
    addProduct
  );

router
  .route('/:id')
  .get(getOneProduct)
  .put(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    uploadPhoto,
    resizePhoto,
    updateProduct
  )
  .delete(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    deleteProduct
  );

module.exports = router;
