const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../../middleware/auth');

const {
  addSupplier,
  updateSupplier,
  getAllSuppliers,
  getOneSupplier,
  deleteSupplier
} = require('../../../controllers/accountant/referenceData/supplier');

router
  .route('/')
  .get(getAllSuppliers)
  .post(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    addSupplier
  );

router
  .route('/:id')
  .get(getOneSupplier)
  .put(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    updateSupplier
  )
  .delete(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    deleteSupplier
  );

module.exports = router;
