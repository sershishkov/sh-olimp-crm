const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../../middleware/auth');

const {
  addGroupOf_Product,
  updateGroupOf_Product,
  getAllGroupOf_Products,
  getOneGroupOf_Product,
  deleteGroupOf_Product
} = require('../../../controllers/accountant/referenceData/groupOf_Product');

router
  .route('/')
  .get(getAllGroupOf_Products)
  .post(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    addGroupOf_Product
  );

router
  .route('/:id')
  .get(getOneGroupOf_Product)
  .put(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    updateGroupOf_Product
  )
  .delete(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    deleteGroupOf_Product
  );

module.exports = router;
