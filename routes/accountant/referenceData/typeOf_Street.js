const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../../middleware/auth');

const {
  addTypeOf_Street,
  updateTypeOf_Street,
  getAllTypeOf_Streets,
  getOneTypeOf_Street,
  deleteTypeOf_Street
} = require('../../../controllers/accountant/referenceData/typeOf_Street');

router
  .route('/')
  .get(getAllTypeOf_Streets)
  .post(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    addTypeOf_Street
  );

router
  .route('/:id')
  .get(getOneTypeOf_Street)
  .put(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    updateTypeOf_Street
  )
  .delete(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    deleteTypeOf_Street
  );

module.exports = router;
