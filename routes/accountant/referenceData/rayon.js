const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../../middleware/auth');

const {
  addRayon,
  updateRayon,
  getAllRayons,
  getOneRayon,
  deleteRayon
} = require('../../../controllers/accountant/referenceData/rayon');

router
  .route('/')
  .get(getAllRayons)
  .post(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    addRayon
  );

router
  .route('/:id')
  .get(getOneRayon)
  .put(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    updateRayon
  )
  .delete(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    deleteRayon
  );

module.exports = router;
