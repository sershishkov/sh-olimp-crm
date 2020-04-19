const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../../middleware/auth');

const {
  addOur_CurrentExpense,
  updateOur_CurrentExpense,
  getAllOur_CurrentExpenses,
  getOneOur_CurrentExpense,
  deleteOur_CurrentExpense
} = require('../../../controllers/accountant/ourMainData/our_CurrentExpense');

router
  .route('/')
  .get(getAllOur_CurrentExpenses)
  .post(
    protect,
    authorize('accountant', 'boss', 'admin'),
    addOur_CurrentExpense
  );

router
  .route('/:id')
  .get(getOneOur_CurrentExpense)
  .put(
    protect,
    authorize('accountant', 'boss', 'admin'),
    updateOur_CurrentExpense
  )
  .delete(
    protect,
    authorize('accountant', 'boss', 'admin'),
    deleteOur_CurrentExpense
  );

module.exports = router;
