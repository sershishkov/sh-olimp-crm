const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

const {
  addCategoryGroupOfImage,
  updateCategoryGroupOfImage,
  getAllCategoryGroupOfImages,
  getOneCategoryGroupOfImage,
  deleteCategoryGroupOfImage
} = require('../controllers/categoryGroupOfImage');

router
  .route('/')
  .get(getAllCategoryGroupOfImages)
  .post(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    addCategoryGroupOfImage
  );

router
  .route('/:id')
  .get(getOneCategoryGroupOfImage)
  .put(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    updateCategoryGroupOfImage
  )
  .delete(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    deleteCategoryGroupOfImage
  );

module.exports = router;
