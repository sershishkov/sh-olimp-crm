const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../../middleware/auth');

const {
  addStreet,
  updateStreet,
  getAllStreets,
  getOneStreet,
  deleteStreet
} = require('../../../controllers/accountant/referenceData/street');

router
  .route('/')
  .get(getAllStreets)
  .post(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    addStreet
  );

router
  .route('/:id')
  .get(getOneStreet)
  .put(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    updateStreet
  )
  .delete(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    deleteStreet
  );

module.exports = router;
