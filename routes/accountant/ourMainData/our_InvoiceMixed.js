const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../../middleware/auth');

const {
  addOur_InvoiceMixed,
  updateOur_InvoiceMixed,
  getAllOur_InvoiceMixeds,
  getOneOur_InvoiceMixed,
  deleteOur_InvoiceMixed
} = require('../../../controllers/accountant/ourMainData/our_InvoiceMixed');

router
  .route('/')
  .get(getAllOur_InvoiceMixeds)
  .post(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    addOur_InvoiceMixed
  );

router
  .route('/:id')
  .get(getOneOur_InvoiceMixed)
  .put(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    updateOur_InvoiceMixed
  )
  .delete(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    deleteOur_InvoiceMixed
  );

module.exports = router;
