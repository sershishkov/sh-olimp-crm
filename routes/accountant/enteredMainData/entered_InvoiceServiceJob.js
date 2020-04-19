const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../../middleware/auth');

const {
  addEntered_InvoiceServiceJob,
  updateEntered_InvoiceServiceJob,
  getAllEntered_InvoiceServiceJobs,
  getOneEntered_InvoiceServiceJob,
  deleteEntered_InvoiceServiceJob
} = require('../../../controllers/accountant/enteredMainData/entered_InvoiceServiceJob');

router
  .route('/')
  .get(getAllEntered_InvoiceServiceJobs)
  .post(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    addEntered_InvoiceServiceJob
  );

router
  .route('/:id')
  .get(getOneEntered_InvoiceServiceJob)
  .put(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    updateEntered_InvoiceServiceJob
  )
  .delete(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    deleteEntered_InvoiceServiceJob
  );

module.exports = router;
