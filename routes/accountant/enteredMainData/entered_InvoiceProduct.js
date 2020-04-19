const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../../middleware/auth');

const {
  addEntered_InvoiceProduct,
  updateEntered_InvoiceProduct,
  getAllEntered_InvoiceProducts,
  getOneEntered_InvoiceProduct,
  deleteEntered_InvoiceProduct
} = require('../../../controllers/accountant/enteredMainData/entered_InvoiceProduct');

router
  .route('/')
  .get(getAllEntered_InvoiceProducts)
  .post(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    addEntered_InvoiceProduct
  );

router
  .route('/:id')
  .get(getOneEntered_InvoiceProduct)
  .put(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    updateEntered_InvoiceProduct
  )
  .delete(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    deleteEntered_InvoiceProduct
  );

module.exports = router;
