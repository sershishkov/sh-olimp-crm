const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../../middleware/auth');

const {
  addBankName,
  updateBankName,
  getAllBankNames,
  getOneBankName,
  deleteBankName
} = require('../../../controllers/accountant/referenceData/bankName');

router
  .route('/')
  .get(getAllBankNames)
  .post(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    addBankName
  );

router
  .route('/:id')
  .get(getOneBankName)
  .put(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    updateBankName
  )
  .delete(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    deleteBankName
  );

module.exports = router;
