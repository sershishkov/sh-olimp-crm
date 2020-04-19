const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../../middleware/auth');

const {
  addOur_SalesInvoiceNakladnaya,
  updateOur_SalesInvoiceNakladnaya,
  getAllOur_SalesInvoiceNakladnayas,
  getOneOur_SalesInvoiceNakladnaya,
  deleteOur_SalesInvoiceNakladnaya
} = require('../../../controllers/accountant/ourMainData/our_SalesInvoiceNakladnaya');

router
  .route('/')
  .get(getAllOur_SalesInvoiceNakladnayas)
  .post(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    addOur_SalesInvoiceNakladnaya
  );

router
  .route('/:id')
  .get(getOneOur_SalesInvoiceNakladnaya)
  .put(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    updateOur_SalesInvoiceNakladnaya
  )
  .delete(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    deleteOur_SalesInvoiceNakladnaya
  );

module.exports = router;
