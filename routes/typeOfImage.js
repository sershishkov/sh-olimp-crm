const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

const {
  addImageType,
  getAllImageTypes,
  getOneImageType,
  deleteImageType
} = require('../controllers/typeOfImage');

router
  .route('/')
  .get(getAllImageTypes)
  .post(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    addImageType
  );

router
  .route('/:id')
  .get(getOneImageType)
  .delete(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    deleteImageType
  );

module.exports = router;
