const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../../middleware/auth');

const {
  addEntered_SalesInvoiceNakladnaya,
  updateEntered_SalesInvoiceNakladnaya,
  getAllEntered_SalesInvoiceNakladnayas,
  getOneEntered_SalesInvoiceNakladnaya,
  deleteEntered_SalesInvoiceNakladnaya
} = require('../../../controllers/accountant/enteredMainData/entered_SalesInvoiceNakladnaya');

router
  .route('/')
  .get(getAllEntered_SalesInvoiceNakladnayas)
  .post(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    addEntered_SalesInvoiceNakladnaya
  );

router
  .route('/:id')
  .get(getOneEntered_SalesInvoiceNakladnaya)
  .put(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    updateEntered_SalesInvoiceNakladnaya
  )
  .delete(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    deleteEntered_SalesInvoiceNakladnaya
  );

module.exports = router;
