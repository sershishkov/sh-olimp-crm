const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../../middleware/auth');

const {
  addImageGroup,
  updateImageGroup,
  getAllImageGroups,
  getOneImageGroup,
  deleteImageGroup,
} = require('../../../controllers/mainInformation/individuals/individual_groupOfImage');

router
  .route('/')
  .get(getAllImageGroups)
  .post(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    addImageGroup
  );

router
  .route('/:id')
  .get(getOneImageGroup)
  .put(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    updateImageGroup
  )
  .delete(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    deleteImageGroup
  );

module.exports = router;
