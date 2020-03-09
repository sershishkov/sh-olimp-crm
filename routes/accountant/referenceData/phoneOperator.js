const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../../middleware/auth');

const {
  addPhoneOperator,
  updatePhoneOperator,
  getAllPhoneOperators,
  getOnePhoneOperator,
  deletePhoneOperator
} = require('../../../controllers/accountant/referenceData/phoneOperator');

router
  .route('/')
  .get(getAllPhoneOperators)
  .post(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    addPhoneOperator
  );

router
  .route('/:id')
  .get(getOnePhoneOperator)
  .put(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    updatePhoneOperator
  )
  .delete(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    deletePhoneOperator
  );

module.exports = router;
