const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../../middleware/auth');

const {
  addOur_Payment,
  updateOur_Payment,
  getAllOur_Payments,
  getOneOur_Payment,
  deleteOur_Payment
} = require('../../../controllers/accountant/ourMainData/our_Payments');

router
  .route('/')
  .get(getAllOur_Payments)
  .post(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    addOur_Payment
  );

router
  .route('/:id')
  .get(getOneOur_Payment)
  .put(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    updateOur_Payment
  )
  .delete(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    deleteOur_Payment
  );

module.exports = router;
