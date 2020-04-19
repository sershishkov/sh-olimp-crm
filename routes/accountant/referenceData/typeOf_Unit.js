const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../../middleware/auth');

const {
  addTypeOf_Unit,
  updateTypeOf_Unit,
  getAllTypeOf_Units,
  getOneTypeOf_Unit,
  deleteTypeOf_Unit
} = require('../../../controllers/accountant/referenceData/typeOf_Unit');

router
  .route('/')
  .get(getAllTypeOf_Units)
  .post(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    addTypeOf_Unit
  );

router
  .route('/:id')
  .get(getOneTypeOf_Unit)
  .put(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    updateTypeOf_Unit
  )
  .delete(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    deleteTypeOf_Unit
  );

module.exports = router;
