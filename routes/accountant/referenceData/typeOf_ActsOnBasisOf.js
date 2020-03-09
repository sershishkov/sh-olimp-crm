const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../../middleware/auth');

const {
  addTypeOf_ActsOnBasisOf,
  updateTypeOf_ActsOnBasisOf,
  getAllTypeOf_ActsOnBasisOfs,
  getOneTypeOf_ActsOnBasisOf,
  deleteTypeOf_ActsOnBasisOf
} = require('../../../controllers/accountant/referenceData/typeOf_ActsOnBasisOf');

router
  .route('/')
  .get(getAllTypeOf_ActsOnBasisOfs)
  .post(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    addTypeOf_ActsOnBasisOf
  );

router
  .route('/:id')
  .get(getOneTypeOf_ActsOnBasisOf)
  .put(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    updateTypeOf_ActsOnBasisOf
  )
  .delete(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    deleteTypeOf_ActsOnBasisOf
  );

module.exports = router;
