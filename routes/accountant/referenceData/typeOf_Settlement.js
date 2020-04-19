const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../../middleware/auth');

const {
  addTypeOf_Settlement,
  updateTypeOf_Settlement,
  getAllTypeOf_Settlements,
  getOneTypeOf_Settlement,
  deleteTypeOf_Settlement
} = require('../../../controllers/accountant/referenceData/typeOf_Settlement');

router
  .route('/')
  .get(getAllTypeOf_Settlements)
  .post(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    addTypeOf_Settlement
  );

router
  .route('/:id')
  .get(getOneTypeOf_Settlement)
  .put(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    updateTypeOf_Settlement
  )
  .delete(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    deleteTypeOf_Settlement
  );

module.exports = router;
