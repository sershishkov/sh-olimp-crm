const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../../middleware/auth');

const {
  addOur_InvoiceProduct,
  updateOur_InvoiceProduct,
  getAllOur_InvoiceProducts,
  getOneOur_InvoiceProduct,
  deleteOur_InvoiceProduct
} = require('../../../controllers/accountant/ourMainData/our_InvoiceProduct');

router
  .route('/')
  .get(getAllOur_InvoiceProducts)
  .post(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    addOur_InvoiceProduct
  );

router
  .route('/:id')
  .get(getOneOur_InvoiceProduct)
  .put(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    updateOur_InvoiceProduct
  )
  .delete(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    deleteOur_InvoiceProduct
  );

module.exports = router;
