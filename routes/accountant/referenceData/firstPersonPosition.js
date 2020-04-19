const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../../middleware/auth');

const {
  addFirstPersonPosition,
  updateFirstPersonPosition,
  getAllFirstPersonPositions,
  getOneFirstPersonPosition,
  deleteFirstPersonPosition
} = require('../../../controllers/accountant/referenceData/firstPersonPosition');

router
  .route('/')
  .get(getAllFirstPersonPositions)
  .post(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    addFirstPersonPosition
  );

router
  .route('/:id')
  .get(getOneFirstPersonPosition)
  .put(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    updateFirstPersonPosition
  )
  .delete(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    deleteFirstPersonPosition
  );

module.exports = router;
