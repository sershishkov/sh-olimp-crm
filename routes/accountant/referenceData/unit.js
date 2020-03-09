const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../../middleware/auth');

const {
  addUnit,
  updateUnit,
  getAllUnits,
  getOneUnit,
  deleteUnit
} = require('../../../controllers/accountant/referenceData/unit');

router
  .route('/')
  .get(getAllUnits)
  .post(protect, authorize('engineer', 'accountant', 'boss', 'admin'), addUnit);

router
  .route('/:id')
  .get(getOneUnit)
  .put(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    updateUnit
  )
  .delete(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    deleteUnit
  );

module.exports = router;
