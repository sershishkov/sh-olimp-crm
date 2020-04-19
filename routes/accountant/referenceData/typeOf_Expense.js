const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../../middleware/auth');

const {
  addTypeOf_Expense,
  updateTypeOf_Expense,
  getAllTypeOf_Expenses,
  getOneTypeOf_Expense,
  deleteTypeOf_Expense
} = require('../../../controllers/accountant/referenceData/typeOf_Expense');

router
  .route('/')
  .get(getAllTypeOf_Expenses)
  .post(protect, authorize('accountant', 'boss', 'admin'), addTypeOf_Expense);

router
  .route('/:id')
  .get(getOneTypeOf_Expense)
  .put(protect, authorize('accountant', 'boss', 'admin'), updateTypeOf_Expense)
  .delete(
    protect,
    authorize('accountant', 'boss', 'admin'),
    deleteTypeOf_Expense
  );

module.exports = router;
