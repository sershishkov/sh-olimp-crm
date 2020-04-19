const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../../middleware/auth');

const {
  addTypeOf_Firm,
  updateTypeOf_Firm,
  getAllTypeOf_Firms,
  getOneTypeOf_Firm,
  deleteTypeOf_Firm
} = require('../../../controllers/accountant/referenceData/typeOf_Firm');

router
  .route('/')
  .get(getAllTypeOf_Firms)
  .post(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    addTypeOf_Firm
  );

router
  .route('/:id')
  .get(getOneTypeOf_Firm)
  .put(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    updateTypeOf_Firm
  )
  .delete(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    deleteTypeOf_Firm
  );

module.exports = router;
