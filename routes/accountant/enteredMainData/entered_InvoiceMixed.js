const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../../middleware/auth');

const {
  addEntered_InvoiceMixed,
  updateEntered_InvoiceMixed,
  getAllEntered_InvoiceMixeds,
  getOneEntered_InvoiceMixed,
  deleteEntered_InvoiceMixed
} = require('../../../controllers/accountant/enteredMainData/entered_InvoiceMixed');

router
  .route('/')
  .get(getAllEntered_InvoiceMixeds)
  .post(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    addEntered_InvoiceMixed
  );

router
  .route('/:id')
  .get(getOneEntered_InvoiceMixed)
  .put(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    updateEntered_InvoiceMixed
  )
  .delete(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    deleteEntered_InvoiceMixed
  );

module.exports = router;
