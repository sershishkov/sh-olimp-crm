const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../../middleware/auth');

const {
  addTypeOf_TaxPayerOn,
  updateTypeOf_TaxPayerOn,
  getAllTypeOf_TaxPayerOns,
  getOneTypeOf_TaxPayerOn,
  deleteTypeOf_TaxPayerOn
} = require('../../../controllers/accountant/referenceData/typeOf_TaxPayerOn');

router
  .route('/')
  .get(getAllTypeOf_TaxPayerOns)
  .post(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    addTypeOf_TaxPayerOn
  );

router
  .route('/:id')
  .get(getOneTypeOf_TaxPayerOn)
  .put(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    updateTypeOf_TaxPayerOn
  )
  .delete(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    deleteTypeOf_TaxPayerOn
  );

module.exports = router;
