const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../../middleware/auth');

const {
  addOur_InvoiceServiceJob,
  updateOur_InvoiceServiceJob,
  getAllOur_InvoiceServiceJobs,
  getOneOur_InvoiceServiceJob,
  deleteOur_InvoiceServiceJob
} = require('../../../controllers/accountant/ourMainData/our_InvoiceServiceJob');

router
  .route('/')
  .get(getAllOur_InvoiceServiceJobs)
  .post(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    addOur_InvoiceServiceJob
  );

router
  .route('/:id')
  .get(getOneOur_InvoiceServiceJob)
  .put(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    updateOur_InvoiceServiceJob
  )
  .delete(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    deleteOur_InvoiceServiceJob
  );

module.exports = router;
