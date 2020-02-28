const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

const {
  addImageGroup,
  getAllImageGroups,
  getOneImageGroup,
  deleteImageGroup
} = require('../controllers/groupOfImage');

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
  .delete(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    deleteImageGroup
  );

module.exports = router;
