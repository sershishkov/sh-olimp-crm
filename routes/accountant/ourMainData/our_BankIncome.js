const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../../middleware/auth');

const {
  addOur_BankIncome,
  updateOur_BankIncome,
  getAllOur_BankIncomes,
  getOneOur_BankIncome,
  deleteOur_BankIncome
} = require('../../../controllers/accountant/ourMainData/our_BankIncome');

router
  .route('/')
  .get(getAllOur_BankIncomes)
  .post(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    addOur_BankIncome
  );

router
  .route('/:id')
  .get(getOneOur_BankIncome)
  .put(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    updateOur_BankIncome
  )
  .delete(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    deleteOur_BankIncome
  );

module.exports = router;
