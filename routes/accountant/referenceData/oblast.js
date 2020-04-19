const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../../middleware/auth');

const {
  addOblast,
  updateOblast,
  getAllOblasts,
  getOneOblast,
  deleteOblast
} = require('../../../controllers/accountant/referenceData/oblast');

router
  .route('/')
  .get(getAllOblasts)
  .post(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    addOblast
  );

router
  .route('/:id')
  .get(getOneOblast)
  .put(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    updateOblast
  )
  .delete(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    deleteOblast
  );

module.exports = router;
